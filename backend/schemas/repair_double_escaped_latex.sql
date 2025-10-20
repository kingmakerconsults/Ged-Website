-- Repair over-escaped LaTeX sequences in existing question_norm rows.

-- Fix stems containing double-escaped backslashes (e.g., \\frac -> \frac)
UPDATE public.questions
SET question_norm = jsonb_set(
      question_norm,
      '{stem}',
      to_jsonb( regexp_replace(question_norm->>'stem', '\\\\', '\\', 'g') )
    ),
    katex_ok = false
WHERE question_norm ? 'stem'
  AND question_norm->>'stem' ~ '\\\\';

-- Fix choices arrays containing double-escaped backslashes
UPDATE public.questions q
SET question_norm = jsonb_set(
      q.question_norm,
      '{choices}',
      (
        SELECT jsonb_agg(to_jsonb(regexp_replace(elem, '\\\\', '\\', 'g')))
        FROM jsonb_array_elements_text(q.question_norm->'choices') AS t(elem)
      )
    ),
    katex_ok = false
WHERE q.question_norm ? 'choices'
  AND q.question_norm->'choices'::text ~ '\\\\';
