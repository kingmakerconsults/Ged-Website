-- Ensure ON CONFLICT (question_id) has a matching unique index.
CREATE UNIQUE INDEX IF NOT EXISTS image_question_bank_question_id_idx
ON image_question_bank (question_id);
