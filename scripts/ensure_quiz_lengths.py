#!/usr/bin/env python3
"""Validate quiz lengths and auto-generate filler questions if needed."""
from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, Iterator, List, Sequence, Set, Tuple, Union

DEFAULT_QUIZ_DIRECTORIES = [
    Path('public/quizzes'),
    Path('backend/quizzes'),
    Path('backend/data/quizzes'),
]
MIN_QUESTION_COUNT = 12


SUBJECT_NAMES = {
    'rla': 'Reasoning Through Language Arts (RLA)',
    'math': 'Mathematical Reasoning',
    'science': 'Science',
    'social-studies': 'Social Studies',
}


@dataclass
class QuizContext:
    file_path: Path
    subject: str
    category: str | None
    topic_id: str | None
    topic_title: str | None
    quiz_id: str | None
    quiz_label: str | None

    @property
    def display_subject(self) -> str:
        return self.subject or 'Unknown Subject'

    @property
    def display_quiz(self) -> str:
        return self.quiz_label or self.quiz_id or self.topic_title or 'Unnamed Quiz'

    @property
    def topic_descriptor(self) -> str:
        for candidate in (self.topic_title, self.topic_id, self.quiz_label, self.quiz_id, self.category):
            if candidate:
                return candidate.replace('_', ' ')
        return 'the topic'


JSONType = Union[Dict[str, 'JSONType'], List['JSONType'], str, int, float, bool, None]


def iter_quiz_nodes(node: JSONType, context: Dict[str, str]) -> Iterator[Tuple[Dict[str, str], Dict[str, JSONType]]]:
    """Yield quiz dictionaries that contain a questions array along with contextual metadata."""
    if isinstance(node, dict):
        # Copy context so nested modifications do not leak upwards.
        current_context = dict(context)

        subject = node.get('subject')
        if isinstance(subject, str):
            current_context.setdefault('subject', subject)

        topic_title = node.get('topicTitle') or node.get('topic') or node.get('title')
        if isinstance(topic_title, str):
            current_context.setdefault('topic_title', topic_title)

        topic_id = node.get('id')
        if isinstance(topic_id, str) and 'topic_id' not in current_context:
            current_context['topic_id'] = topic_id

        label = node.get('label')
        if isinstance(label, str):
            current_context['quiz_label'] = label

        quiz_id = node.get('quizId') or node.get('id')
        if isinstance(quiz_id, str):
            current_context['quiz_id'] = quiz_id

        if 'questions' in node and isinstance(node['questions'], list):
            yield current_context, node  # type: ignore[return-value]
            return

        categories = node.get('categories')
        if isinstance(categories, dict):
            for category_name, category_value in categories.items():
                category_context = dict(current_context)
                category_context['category'] = category_name
                yield from iter_quiz_nodes(category_value, category_context)
            return

        topics = node.get('topics')
        if isinstance(topics, list):
            for topic in topics:
                if isinstance(topic, dict):
                    topic_context = dict(current_context)
                    if isinstance(topic.get('title'), str):
                        topic_context['topic_title'] = topic['title']
                    if isinstance(topic.get('id'), str):
                        topic_context['topic_id'] = topic['id']
                    yield from iter_quiz_nodes(topic, topic_context)
            return

        # Recurse into other nested structures.
        for key, value in node.items():
            if key == 'questions':
                continue
            if isinstance(value, (dict, list)):
                yield from iter_quiz_nodes(value, current_context)

    elif isinstance(node, list):
        for item in node:
            yield from iter_quiz_nodes(item, context)


def distribute_difficulties(count: int) -> List[str]:
    """Allocate difficulties with a 50% medium, 25% easy, 25% hard split."""
    if count <= 0:
        return []

    ratios = [('medium', 0.5), ('easy', 0.25), ('hard', 0.25)]
    allocations = {level: int(count * ratio) for level, ratio in ratios}
    assigned = sum(allocations.values())
    remainder = count - assigned

    for level, _ in sorted(ratios, key=lambda item: (-item[1], item[0])):
        if remainder <= 0:
            break
        allocations[level] += 1
        remainder -= 1

    order = ['medium', 'easy', 'hard']
    difficulties: List[str] = []
    while sum(allocations.values()) > 0:
        for level in order:
            if allocations[level] > 0:
                difficulties.append(level)
                allocations[level] -= 1
    return difficulties


def build_option_dicts(topic_descriptor: str, subject: str, difficulty: str, number: int) -> List[Dict[str, Union[str, bool]]]:
    prompts = [
        (False, f"A. Provides contextual detail but misses the {topic_descriptor} focus."),
        (True, f"B. Connects the {topic_descriptor} concept to {subject.lower()} reasoning at question {number}."),
        (False, f"C. Mentions a related idea yet overlooks the main analytical task."),
        (False, f"D. Introduces an unrelated angle that does not solve the prompt."),
    ]

    options: List[Dict[str, Union[str, bool]]] = []
    for is_correct, text in prompts:
        rationale = (
            "This option aligns with the required analysis." if is_correct
            else "This choice does not address the key skill emphasized by the question."
        )
        options.append({
            'text': text,
            'isCorrect': is_correct,
            'rationale': rationale,
        })
    return options


def build_option_strings(topic_descriptor: str, subject: str, difficulty: str, number: int) -> Tuple[List[str], str]:
    options = [
        f"Highlights background context rather than the {topic_descriptor} task.",
        f"Links the {topic_descriptor} idea to core {subject.lower()} reasoning skills.",
        f"Focuses on peripheral vocabulary from the scenario.",
        f"Discusses an unrelated concept outside the prompt.",
    ]
    correct = options[1]
    return options, correct


def generate_passage(topic_descriptor: str, subject: str, difficulty: str, number: int) -> str:
    return (
        f"{topic_descriptor.title()} Case Study {number}: Learners explore a {difficulty}-level scenario"
        f" that highlights how {subject.lower()} principles influence decision-making."
    )


def generate_content(topic_descriptor: str, subject: str, difficulty: str, number: int) -> str:
    return (
        f"Scenario {number} examines {topic_descriptor} themes so students can practice"
        f" applying {subject.lower()} insights at a {difficulty} level."
    )


def construct_question(
    quiz: Dict[str, JSONType],
    base_question: Dict[str, JSONType] | None,
    number: int,
    difficulty: str,
    context: QuizContext,
) -> Dict[str, JSONType]:
    subject = context.display_subject
    topic_descriptor = context.topic_descriptor

    template = base_question or {}
    question: Dict[str, JSONType] = {'questionNumber': number}

    if isinstance(template.get('type'), str):
        question['type'] = template['type']

    if 'passage' in template:
        question['passage'] = generate_passage(topic_descriptor, subject, difficulty, number)

    if 'content' in template:
        question['content'] = generate_content(topic_descriptor, subject, difficulty, number)

    question['question'] = (
        f"{topic_descriptor.title()} practice question {number}: Which option best demonstrates"
        f" a {difficulty} understanding of {subject.lower()} concepts for this quiz?"
    )

    answer_options = template.get('answerOptions') if isinstance(template, dict) else None

    if isinstance(answer_options, list) and answer_options and isinstance(answer_options[0], dict):
        question['answerOptions'] = build_option_dicts(topic_descriptor, subject, difficulty, number)
        if any('difficulty' in q for q in quiz.get('questions', []) if isinstance(q, dict)):
            question['difficulty'] = difficulty
        if 'explanation' in template:
            question['explanation'] = (
                f"The correct option ties the {topic_descriptor} focus to {subject.lower()} reasoning"
                f" at a {difficulty} level."
            )
    else:
        options, correct = build_option_strings(topic_descriptor, subject, difficulty, number)
        question['answerOptions'] = options
        question['correctAnswer'] = correct

    if 'explanation' in template and 'explanation' not in question:
        question['explanation'] = (
            f"Selecting the option that showcases the {topic_descriptor} concept is essential"
            f" for demonstrating {subject.lower()} mastery."
        )

    question['__autogen'] = True

    return question


def ensure_quiz_length(quiz: Dict[str, JSONType], context: QuizContext) -> Tuple[int, int, List[Dict[str, JSONType]]]:
    questions = quiz.get('questions')
    if not isinstance(questions, list):
        return 0, 0, []

    current_count = len(questions)
    if current_count >= MIN_QUESTION_COUNT:
        return current_count, current_count, []

    deficit = MIN_QUESTION_COUNT - current_count
    base_question = next((q for q in questions if isinstance(q, dict)), None)

    try:
        max_number = max(q.get('questionNumber', 0) for q in questions if isinstance(q, dict))
    except ValueError:
        max_number = 0

    difficulties = distribute_difficulties(deficit)
    new_questions: List[Dict[str, JSONType]] = []
    for index, difficulty in enumerate(difficulties, start=1):
        question_number = max_number + index
        new_question = construct_question(quiz, base_question, question_number, difficulty, context)
        new_questions.append(new_question)

    questions.extend(new_questions)
    return current_count, len(questions), new_questions


def derive_subject_from_path(path: Path) -> str:
    for part in reversed(path.parts):
        key = part.lower()
        if key in SUBJECT_NAMES:
            return SUBJECT_NAMES[key]
    return SUBJECT_NAMES.get(path.parent.name.lower(), path.parent.name)


def load_json(path: Path) -> JSONType:
    return json.loads(path.read_text(encoding='utf-8'))


def save_json(path: Path, data: JSONType) -> None:
    text = json.dumps(data, indent=2, ensure_ascii=False)
    path.write_text(text + '\n', encoding='utf-8')


@dataclass
class JSModuleExport:
    prefix: str
    before_array: str
    after_array: str


def load_js_module(path: Path) -> Tuple[List[Dict[str, JSONType]], JSModuleExport]:
    text = path.read_text(encoding='utf-8')
    module_index = text.find('module.exports')
    if module_index == -1:
        raise ValueError(f'File does not contain a module.exports assignment: {path}')

    prefix = text[:module_index]
    remainder = text[module_index:]

    array_start = remainder.find('[')
    array_end = remainder.rfind(']')

    if array_start == -1 or array_end == -1 or array_end <= array_start:
        raise ValueError(f'Unable to locate exported array in {path}')

    before_array = remainder[:array_start]
    array_text = remainder[array_start : array_end + 1]
    after_array = remainder[array_end + 1 :]

    normalized = re.sub(r',\s*\]', ']', array_text)
    questions = json.loads(normalized)

    return questions, JSModuleExport(prefix=prefix, before_array=before_array, after_array=after_array)


def save_js_module(path: Path, questions: List[Dict[str, JSONType]], metadata: JSModuleExport) -> None:
    array_text = json.dumps(questions, indent=2, ensure_ascii=False)
    if not array_text.endswith('\n'):
        array_text += '\n'

    after_array = metadata.after_array or ';\n'
    text = f"{metadata.prefix}{metadata.before_array}{array_text}{after_array}"
    if not text.endswith('\n'):
        text += '\n'
    path.write_text(text, encoding='utf-8')


def discover_quiz_directories(roots: Sequence[Path]) -> List[Path]:
    """Return all directories named "quizzes" beneath the provided roots."""

    discovered: Set[Path] = set()
    excluded = {'node_modules', '.git', '__pycache__'}

    for root in roots:
        if not root.exists():
            continue
        for path in root.rglob('quizzes'):
            if not path.is_dir():
                continue
            if any(part in excluded for part in path.parts):
                continue
            discovered.add(path)

    return sorted(discovered)


def normalize_directories(values: Iterable[Path]) -> List[Path]:
    """Return a sorted, de-duplicated list of existing directories."""

    seen: Set[Path] = set()
    normalized: List[Path] = []
    for path in values:
        resolved = path.resolve()
        if not resolved.exists() or not resolved.is_dir():
            continue
        if resolved in seen:
            continue
        seen.add(resolved)
        normalized.append(resolved)
    return sorted(normalized)


def normalize_reference(path_str: str) -> str:
    return Path(path_str).as_posix()


def sync_question_counts(node: JSONType, counts: Dict[str, int]) -> bool:
    modified = False

    if isinstance(node, dict):
        file_value = node.get('file')
        if isinstance(file_value, str):
            normalized = normalize_reference(file_value)
            if normalized in counts:
                config = node.get('config')
                if isinstance(config, dict):
                    parts = config.get('parts')
                    if isinstance(parts, list):
                        for part in parts:
                            if isinstance(part, dict) and 'questionCount' in part:
                                if part.get('questionCount') != counts[normalized]:
                                    part['questionCount'] = counts[normalized]
                                    modified = True

        for value in node.values():
            if isinstance(value, (dict, list)) and sync_question_counts(value, counts):
                modified = True

    elif isinstance(node, list):
        for item in node:
            if isinstance(item, (dict, list)) and sync_question_counts(item, counts):
                modified = True

    return modified


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--log', action='store_true', help='Write an audit log summarizing any updates.')
    parser.add_argument('--log-file', default='quiz_length_audit.log', help='Path to the optional audit log file.')
    parser.add_argument(
        '--dirs',
        nargs='*',
        type=Path,
        default=None,
        help='Additional directories to scan for quiz JSON files.',
    )
    parser.add_argument(
        '--discover',
        action='store_true',
        help='Automatically include every directory named "quizzes" below the repository root.',
    )
    parser.add_argument(
        '--report',
        action='store_true',
        help='Print a before/after question count for each processed quiz.',
    )
    args = parser.parse_args()

    audit_entries: List[str] = []
    expansions: List[str] = []
    reports: List[str] = []

    repo_root = Path('.').resolve()
    base_directories: List[Path] = list(DEFAULT_QUIZ_DIRECTORIES)

    if args.dirs:
        base_directories.extend(args.dirs)

    if args.discover:
        base_directories.extend(discover_quiz_directories([repo_root]))

    directories = normalize_directories(base_directories)

    if not directories:
        print('No quiz directories were found. Nothing to process.')
        return

    processed_js_counts: Dict[str, int] = {}

    for directory in directories:
        candidates = [
            path
            for path in directory.rglob('*')
            if path.is_file() and path.suffix in {'.json', '.js'}
        ]

        for file_path in sorted(candidates, key=lambda p: (p.suffix != '.js', str(p))):
            if file_path.suffix == '.json':
                data = load_json(file_path)
                modified = False

                for raw_context, quiz in iter_quiz_nodes(data, {}):
                    subject = raw_context.get('subject')
                    if not subject and isinstance(data, dict):
                        subject = data.get('subject')
                    context = QuizContext(
                        file_path=file_path,
                        subject=subject or 'Unknown Subject',
                        category=raw_context.get('category'),
                        topic_id=raw_context.get('topic_id'),
                        topic_title=raw_context.get('topic_title'),
                        quiz_id=raw_context.get('quiz_id'),
                        quiz_label=raw_context.get('quiz_label'),
                    )

                    before, after, new_questions = ensure_quiz_length(quiz, context)
                    relative_path = file_path.relative_to(repo_root)
                    report_summary = (
                        f"{context.display_subject} | {context.display_quiz}"
                        f" | {before} -> {after} questions (file: {relative_path})"
                    )
                    reports.append(report_summary)
                    if before != after:
                        modified = True
                        expansions.append(report_summary)
                        audit_entries.append(report_summary)

                if sync_question_counts(data, processed_js_counts):
                    modified = True

                if modified:
                    save_json(file_path, data)

            elif file_path.suffix == '.js':
                try:
                    questions, metadata = load_js_module(file_path)
                except ValueError:
                    continue

                subject = derive_subject_from_path(file_path)
                topic_title = file_path.stem.replace('_', ' ')
                container = {'questions': questions}
                context = QuizContext(
                    file_path=file_path,
                    subject=subject,
                    category=None,
                    topic_id=file_path.stem,
                    topic_title=topic_title,
                    quiz_id=file_path.stem,
                    quiz_label=None,
                )

                before, after, new_questions = ensure_quiz_length(container, context)
                relative_path = file_path.relative_to(repo_root)
                report_summary = (
                    f"{context.display_subject} | {context.display_quiz}"
                    f" | {before} -> {after} questions (file: {relative_path})"
                )
                reports.append(report_summary)
                normalized_path = normalize_reference(relative_path.as_posix())
                if before != after:
                    save_js_module(file_path, questions, metadata)
                    expansions.append(report_summary)
                    audit_entries.append(report_summary)
                    processed_js_counts[normalized_path] = after
                else:
                    processed_js_counts.setdefault(normalized_path, after)

    if expansions:
        print('Expanded quizzes:')
        for line in expansions:
            print(f" - {line}")
    else:
        print('All quizzes already meet or exceed the minimum question count. No changes required.')

    if args.report:
        print('\nQuiz length report:')
        for entry in reports:
            print(f" - {entry}")

    if args.log:
        log_path = Path(args.log_file)
        with log_path.open('w', encoding='utf-8') as log_file:
            if audit_entries:
                log_file.write('Quiz Length Audit\n')
                log_file.write('=================\n')
                for entry in audit_entries:
                    log_file.write(f"{entry}\n")
            else:
                log_file.write('No quizzes required expansion. All exams meet the minimum length.\n')
        print(f'Audit log written to {log_path}')


if __name__ == '__main__':
    main()
