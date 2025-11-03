"""Utility to scan premade math quizzes for arithmetic consistency.

The script parses every question rationale and answer-option rationale in
``public/quizzes/math.quizzes.part1.json`` and
``public/quizzes/math.quizzes.part2.json`` looking for inline equations (e.g.
"3 × 4 = 12"). For each equation it evaluates the left- and right-hand sides
and flags any mismatches beyond a small floating-point tolerance. Percents are
handled specially so comparisons like "0.4 * 100 = 40%" are treated as
consistent. Statements that cannot be parsed into numeric expressions are
ignored.
"""
from __future__ import annotations

import argparse
import json
import math
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, List, Optional

MATH_FILES = [
    Path("public/quizzes/math.quizzes.part1.json"),
    Path("public/quizzes/math.quizzes.part2.json"),
]

EQUATION_PATTERN = re.compile(r"([0-9][^=\n]*)=\s*([^\n]*)")

REPLACEMENTS = (
    ("×", "*"),
    ("·", "*"),
    ("÷", "/"),
    ("−", "-"),
    ("—", "-"),
    (",", ""),
    ("$", ""),
    ("π", "3.14"),
    ("pi", "3.14"),
    ("^", "**"),
    ("%", "/100"),
    ("°", ""),
)

IMPLICIT_MULTIPLICATION_FIXES = (
    (re.compile(r"(?<=\d)\("), "*("),
    (re.compile(r"\)(?=\d)"), ")*"),
    (re.compile(r"\)(?=\()"), ")*("),
)


@dataclass
class EquationCheck:
    location: str
    raw_left: str
    raw_right: str
    left_value: float
    right_value: float


@dataclass
class ParseResult:
    value: Optional[float]
    had_percent: bool


def _normalize_expression(expr: str) -> str:
    cleaned = expr
    for old, new in REPLACEMENTS:
        cleaned = cleaned.replace(old, new)
    for pattern, replacement in IMPLICIT_MULTIPLICATION_FIXES:
        cleaned = pattern.sub(replacement, cleaned)
    return cleaned.strip()


def _evaluate(expr: str) -> ParseResult:
    expr = expr.strip()
    had_percent = "%" in expr
    sanitized = expr.replace("π", "").replace("pi", "")
    if any(ch.isalpha() for ch in sanitized):
        return ParseResult(None, had_percent)
    normalized = _normalize_expression(expr)
    if not normalized:
        return ParseResult(None, had_percent)
    try:
        value = eval(normalized, {"__builtins__": {}, "math": math}, {})
    except Exception:
        return ParseResult(None, had_percent)
    if isinstance(value, (int, float)):
        return ParseResult(float(value), had_percent)
    return ParseResult(None, had_percent)


def iter_equations(text: str) -> Iterable[tuple[str, str]]:
    for match in EQUATION_PATTERN.finditer(text):
        raw_left, raw_right = match.groups()
        left = raw_left.strip().rstrip(".,;: )")
        right = raw_right.strip().rstrip(".,;: )")
        # Skip matches that truncate an alphabetic token such as "sqrt".
        prefix = text[: match.start(1)]
        idx = len(prefix) - 1
        while idx >= 0 and prefix[idx] in " ([^":
            idx -= 1
        if idx >= 0 and prefix[idx].isalpha():
            continue
        pi_prefix = re.search(r"(pi|π)\s*\*\s*\$?$", prefix)
        if pi_prefix:
            left = (prefix[pi_prefix.start():] + left).strip()
        sign_idx = match.start(1) - 1
        while sign_idx >= 0 and text[sign_idx].isspace():
            sign_idx -= 1
        if sign_idx >= 0 and text[sign_idx] in {"-", "−", "+"}:
            left = text[sign_idx] + left
        yield left, right


def check_file(path: Path) -> List[EquationCheck]:
    data = json.loads(path.read_text())
    failures: List[EquationCheck] = []

    def visit_text(location: str, text: str) -> None:
        for raw_left, raw_right in iter_equations(text):
            left = _evaluate(raw_left)
            right = _evaluate(raw_right)
            if left.value is None or right.value is None:
                continue
            if math.isclose(left.value, right.value, rel_tol=1e-9, abs_tol=1e-9):
                continue
            # Handle percent comparisons like "0.4 * 100 = 40%".
            left_adjusted = left.value / 100 if right.had_percent and not left.had_percent else left.value
            right_adjusted = right.value / 100 if left.had_percent and not right.had_percent else right.value
            if math.isclose(left_adjusted, right_adjusted, rel_tol=1e-9, abs_tol=1e-9):
                continue
            failures.append(
                EquationCheck(
                    location=location,
                    raw_left=raw_left,
                    raw_right=raw_right,
                    left_value=left.value,
                    right_value=right.value,
                )
            )

    for category in data.get("categories", {}).values():
        for topic in category.get("topics", []):
            for quiz in topic.get("quizzes", []):
                quiz_id = quiz.get("quizId", quiz.get("id", "unknown_quiz"))
                for index, question in enumerate(quiz.get("questions", []), start=1):
                    q_number = question.get("questionNumber", index)
                    base_location = f"{path}:{quiz_id}#Q{q_number}"
                    if "rationale" in question and isinstance(question["rationale"], str):
                        visit_text(base_location, question["rationale"])
                    for option_index, option in enumerate(question.get("answerOptions", []), start=1):
                        if isinstance(option, dict) and isinstance(option.get("rationale"), str):
                            location = f"{base_location}:option{option_index}"
                            visit_text(location, option["rationale"])
    return failures


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--fail-on-issue",
        action="store_true",
        help="Return a non-zero exit code if any mismatched equations are detected.",
    )
    args = parser.parse_args()

    all_failures: List[EquationCheck] = []
    for path in MATH_FILES:
        failures = check_file(path)
        if failures:
            print(f"Found {len(failures)} potential mismatches in {path}")
            for failure in failures:
                print(
                    f"  {failure.location}: {failure.raw_left} = {failure.raw_right} "
                    f"(evaluated {failure.left_value} vs {failure.right_value})"
                )
        else:
            print(f"No arithmetic mismatches detected in {path}")
        all_failures.extend(failures)

    if args.fail_on_issue and all_failures:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
