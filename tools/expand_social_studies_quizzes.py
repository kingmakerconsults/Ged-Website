import json
from copy import deepcopy
from pathlib import Path

from social_studies_bank import QUESTION_BANK

ROOT = Path(__file__).resolve().parents[1]
SOCIAL_STUDIES_PATH = ROOT / "public" / "quizzes" / "social-studies.quizzes.json"
MIN_QUESTIONS = 12


def load_quizzes(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as fh:
        return json.load(fh)


def save_quizzes(path: Path, data: dict) -> None:
    with path.open("w", encoding="utf-8") as fh:
        json.dump(data, fh, indent=2, ensure_ascii=False)
        fh.write("\n")


def ensure_question_numbers(questions: list) -> None:
    for idx, question in enumerate(questions, start=1):
        question["questionNumber"] = idx


def expand_quiz(quiz: dict, bank_key: str, report: list) -> None:
    questions = quiz.get("questions") or []
    need = max(0, MIN_QUESTIONS - len(questions))
    if need <= 0:
        ensure_question_numbers(questions)
        return

    bank = QUESTION_BANK.get(bank_key)
    if not bank:
        raise KeyError(f"No question bank entries for quizId '{bank_key}'")
    if len(bank) < need:
        raise ValueError(f"Insufficient question templates for {bank_key}: need {need}, have {len(bank)}")

    start_len = len(questions)
    for offset in range(need):
        template = bank[offset]
        new_question = deepcopy(template)
        new_question["questionNumber"] = start_len + offset + 1
        questions.append(new_question)

    quiz["questions"] = questions
    ensure_question_numbers(questions)
    report.append({
        "quizId": bank_key,
        "added": need,
        "before": start_len,
        "after": len(questions),
    })


def expand_all(data: dict) -> list:
    report = []
    for category in (data.get("categories") or {}).values():
        for topic in category.get("topics", []):
            for quiz in topic.get("quizzes", []):
                bank_key = quiz.get("quizId")
                if not bank_key:
                    continue
                expand_quiz(quiz, bank_key, report)
    return report


def main() -> None:
    data = load_quizzes(SOCIAL_STUDIES_PATH)
    report = expand_all(data)
    save_quizzes(SOCIAL_STUDIES_PATH, data)
    added_total = sum(item["added"] for item in report)
    print(f"Updated {len(report)} quizzes; added {added_total} questions.")
    for entry in report:
        print(f" - {entry['quizId']}: {entry['before']} -> {entry['after']} (added {entry['added']})")


if __name__ == "__main__":
    main()
