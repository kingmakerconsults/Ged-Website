import os
import re
import json
from typing import Any, Dict, List, Tuple

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
OUTPUT_FILES = {
    "rla": os.path.join(DATA_DIR, "rla_passages.json"),
    "social_studies": os.path.join(DATA_DIR, "social_studies_passages.json"),
    "science": os.path.join(DATA_DIR, "science_passages.json"),
    "math": os.path.join(DATA_DIR, "math_word_problems.json"),
}

SUBJECT_MAP = {
    "rla": "rla",
    "ela": "rla",
    "reading": "rla",
    "english": "rla",
    "language arts": "rla",

    "social studies": "social_studies",
    "social_studies": "social_studies",
    "history": "social_studies",
    "civics": "social_studies",
    "government": "social_studies",
    "economics": "social_studies",

    "science": "science",
    "life science": "science",
    "physical science": "science",
    "earth science": "science",

    "math": "math",
    "mathematics": "math",
}

# Heuristic label enrichment for social studies & science
SOC_STUDIES_LABELS = [
    (re.compile(r"\b(constitution|founding|federalist|bill of rights|amendment)\b", re.I), "Constitution"),
    (re.compile(r"\b(civil rights?|segregation|abolition|slavery)\b", re.I), "Civil Rights"),
    (re.compile(r"\b(revolution|independence|patriot|colony|colonial)\b", re.I), "American Revolution"),
    (re.compile(r"\b(world war|wwi|wwii|great war)\b", re.I), "World Wars"),
    (re.compile(r"\b(great depression|new deal)\b", re.I), "Great Depression"),
    (re.compile(r"\b(reconstruction)\b", re.I), "Reconstruction"),
]
SCIENCE_LABELS = [
    (re.compile(r"\b(evolution|natural selection|species|darwin|mendel)\b", re.I), "Evolution"),
    (re.compile(r"\b(atom|radioactivity|electron|nucleus|atomic)\b", re.I), "Atomic Theory"),
    (re.compile(r"\b(ecology|ecosystem|conservation|environment|photosynthesis)\b", re.I), "Ecology"),
    (re.compile(r"\b(astronomy|planet|galaxy|jupiter|telescope|kepler|relativity)\b", re.I), "Astronomy"),
    (re.compile(r"\b(geology|rock|fossil|erosion|strata|deep time)\b", re.I), "Geology"),
    (re.compile(r"\b(electric|magnet|field|current|induction)\b", re.I), "Electricity & Magnetism"),
]

# ID patterns and counters
ID_PATTERNS = {
    "rla": ("rla_passage_", 1, 99),
    "social_studies": ("ss_passage_", 1, 99),
    "science": ("sci_passage_", 1, 99),
    "math": ("math_word_", 1, 999),
}

ALIAS_TEXT_KEYS = ["text", "content", "passage", "body"]


def list_candidate_json_files(data_dir: str) -> List[str]:
    files = []
    for name in os.listdir(data_dir):
        p = os.path.join(data_dir, name)
        if os.path.isdir(p):
            continue  # ignore nested folders (e.g., quizzes)
        if not name.lower().endswith(".json"):
            continue
        # ignore outputs and known non-passage files
        if name in {"vocabulary.json", "rla_passages.json", "social_studies_passages.json", "science_passages.json", "math_word_problems.json"}:
            continue
        files.append(p)
    return files


def remove_code_fences(s: str) -> str:
    # Remove any markdown code fences like ```json or ```
    return re.sub(r"```\w*|```", "", s)


def try_json_load(s: str) -> List[Dict[str, Any]]:
    s = s.strip()
    try:
        obj = json.loads(s)
        if isinstance(obj, dict):
            # some files might wrap array into an object
            # unify to list if there is a top-level key containing list
            for v in obj.values():
                if isinstance(v, list):
                    return v
            return [obj]
        elif isinstance(obj, list):
            return obj
    except Exception:
        pass
    # Fallback: extract multiple arrays concatenated together
    arrays: List[Dict[str, Any]] = []
    cleaned = remove_code_fences(s)
    # Find top-level JSON arrays by bracket depth (ignoring strings)
    buf = []
    depth = 0
    in_str = False
    esc = False
    start_idx = None
    for i, ch in enumerate(cleaned):
        if in_str:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == '"':
                in_str = False
        else:
            if ch == '"':
                in_str = True
            elif ch == '[':
                depth += 1
                if depth == 1:
                    start_idx = i
            elif ch == ']':
                depth -= 1
                if depth == 0 and start_idx is not None:
                    segment = cleaned[start_idx:i+1]
                    try:
                        part = json.loads(segment)
                        if isinstance(part, list):
                            arrays.extend(part)
                    except Exception:
                        # try to recover small JSON errors like trailing commas
                        segment2 = re.sub(r",\s*]", "]", segment)
                        try:
                            part = json.loads(segment2)
                            if isinstance(part, list):
                                arrays.extend(part)
                        except Exception:
                            pass
                    start_idx = None
    if arrays:
        return arrays
    raise ValueError("Unable to parse JSON content with available strategies")


def normalize_subject(raw: str, data: Dict[str, Any]) -> str:
    if not raw:
        # Infer from content
        has_problem = isinstance(data.get("problem"), str) and isinstance(data.get("answer"), (str, int, float))
        if has_problem:
            return "math"
        # Heuristic from labels/topics/content
        text = extract_text(data) or ""  # use passage text for hints
        comb = " ".join([
            str(data.get("label", "")),
            str(data.get("topic", "")),
            text,
        ]).lower()
        for key in ["evolution", "atom", "biology", "physics", "astronomy", "geology", "chemistry", "photosynthesis", "species", "dna", "ecosystem", "ecology", "telescope", "planet"]:
            if key in comb:
                return "science"
        for key in ["constitution", "congress", "revolution", "civil war", "civil rights", "declaration", "treaty", "president", "senate", "government", "economics", "foreign policy", "world war", "bill of rights"]:
            if key in comb:
                return "social_studies"
        return "rla"
    norm = SUBJECT_MAP.get(raw.strip().lower(), None)
    if norm:
        return norm
    # Try to map things like "social studies"
    lower = raw.strip().lower().replace("_", " ")
    return SUBJECT_MAP.get(lower, lower.replace(" ", "_"))


def extract_text(data: Dict[str, Any]) -> str:
    for key in ALIAS_TEXT_KEYS:
        if key in data and isinstance(data[key], str):
            return data[key]
    return ""


def enrich_label(subject: str, text: str, current_label: str | None) -> str:
    label = (current_label or "").strip()
    if subject == "social_studies":
        for pat, tag in SOC_STUDIES_LABELS:
            if pat.search(text):
                if label:
                    if tag.lower() not in label.lower():
                        return f"{label} | {tag}"
                else:
                    return tag
    elif subject == "science":
        for pat, tag in SCIENCE_LABELS:
            if pat.search(text):
                if label:
                    if tag.lower() not in label.lower():
                        return f"{label} | {tag}"
                else:
                    return tag
    return label if label else "General"


def derive_title(text: str, problem: str | None) -> str:
    base = (problem or text).strip()
    if not base:
        return "Untitled"
    # Take first 8 words
    words = re.findall(r"\b\w+[\w'\-]*\b", base)
    title = " ".join(words[:8])
    if len(words) > 8:
        title += "…"
    return title.title()


def next_id(existing: set, subject: str) -> str:
    prefix, start, width = ID_PATTERNS[subject]
    i = start
    while True:
        ident = f"{prefix}{i:0{len(str(width))}d}"
        if ident not in existing:
            existing.add(ident)
            return ident
        i += 1


def normalize_item(item: Dict[str, Any], subject_hint: str, source_file: str, id_sets: Dict[str, set]) -> Tuple[str, Dict[str, Any]]:
    # Copy to avoid mutating original input when we also pass through fields
    data = dict(item)

    subject = normalize_subject(data.get("subject"), data)
    if subject_hint and subject_hint != subject:
        # trust explicit detection over hint
        pass

    # Determine content type
    is_math_word = subject == "math" and isinstance(data.get("problem"), str) and ("answer" in data)
    content_type = "word_problem" if is_math_word else "passage"

    # Normalize text field names for passages
    text_value = extract_text(data)
    if not is_math_word:
        if not text_value:
            # sometimes the passage is under 'content' or 'passage' or 'body' (already handled)
            pass
        # Remove alias keys and set 'text'
        for k in list(data.keys()):
            if k in {"content", "passage", "body"}:
                # capture before deleting
                text_value = text_value or (data.get(k) if isinstance(data.get(k), str) else "")
                del data[k]
        data["text"] = text_value
    else:
        # Ensure problem/answer are strings (keep as-is otherwise)
        pass

    # Determine area and label
    area = data.get("area") or data.get("topic") or ("Quantitative Reasoning" if is_math_word else "General")
    label = data.get("label") or (data.get("type") if subject == "rla" else None)
    # Enrich based on text/problem
    enrich_text = text_value if not is_math_word else str(data.get("problem", ""))
    label = enrich_label(subject, enrich_text, label)

    # Title
    title = data.get("title")
    if not title or not isinstance(title, str) or not title.strip():
        title = derive_title(enrich_text, data.get("problem") if is_math_word else None)
        data["title"] = title

    # Subject & content type
    data["subject"] = subject
    data["content_type"] = content_type

    # ID
    ident = data.get("id")
    if not ident or not isinstance(ident, str) or not ident.strip():
        ident = next_id(id_sets[subject], subject)
        data["id"] = ident
    else:
        id_sets[subject].add(ident)

    # Required metadata
    data.setdefault("grade_band", "ged")
    data.setdefault("difficulty", "medium")
    data["source_file"] = os.path.basename(source_file)
    data.setdefault("area", area)
    data.setdefault("label", label)

    return subject, data


def load_items_from_file(path: str) -> List[Dict[str, Any]]:
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
    text = remove_code_fences(text)
    items = try_json_load(text)
    # Each item should be a dict; if not, attempt to coerce
    out: List[Dict[str, Any]] = []
    for it in items:
        if isinstance(it, dict):
            out.append(it)
        else:
            # Some legacy arrays may contain simple {title, passage} objects without subject
            try:
                out.append(dict(it))
            except Exception:
                # skip unknown entries
                pass
    return out


def main():
    files = list_candidate_json_files(DATA_DIR)
    if not files:
        print("No candidate JSON files found in /data")
        return

    groups: Dict[str, List[Dict[str, Any]]] = {"rla": [], "social_studies": [], "science": [], "math": []}
    id_sets: Dict[str, set] = {k: set() for k in groups.keys()}

    for fp in files:
        try:
            items = load_items_from_file(fp)
        except Exception as e:
            print(f"WARN: Skipping {os.path.basename(fp)} due to parse error: {e}")
            continue
        for raw in items:
            # If the object looks like {title,label,passage} with no subject, treat as social studies by default
            subject_hint = None
            if ("passage" in raw or "content" in raw or "text" in raw) and not raw.get("subject"):
                # very rough heuristic to classify
                text_candidate = extract_text(raw) or raw.get("title", "") or ""
                low = (raw.get("label", "") + " " + text_candidate).lower()
                if any(k in low for k in ["biology", "physics", "chemistry", "science", "ecosystem", "evolution"]):
                    subject_hint = "science"
                elif any(k in low for k in ["civic", "constitution", "history", "rights", "war", "treaty", "economics", "president", "government"]):
                    subject_hint = "social_studies"
                else:
                    subject_hint = "rla"
            subject, norm = normalize_item(raw, subject_hint or "", os.path.basename(fp), id_sets)
            groups[subject].append(norm)

    # Write outputs
    for subject, out_path in OUTPUT_FILES.items():
        data = groups[subject]
        # Ensure unique IDs within file
        seen = set()
        for it in data:
            if it["id"] in seen:
                # generate a fresh ID
                it["id"] = next_id(id_sets[subject], subject)
            seen.add(it["id"])
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Wrote {len(data)} items -> {out_path}")


if __name__ == "__main__":
    main()
