export type QuestionType = 'single' | 'multi' | 'scale' | 'text';

export interface Question {
  id: number;
  questionnaire_id: number;
  title: string;
  type: QuestionType;
  min_value?: number | null;
  max_value?: number | null;
  step?: number | null;
}

export interface Option {
  id: number;
  question_id: number;
  label: string;
  value?: number | null;
}

export interface AnswerItem {
  question_id: number;
  option_ids?: number[]; // for multi
  option_id?: number;    // for single
  answer_value?: number; // for scale
  answer_text?: string;  // for text
}

export interface SubmitPayload {
  questionnaire_id: number;
  session_id: string;
  items: AnswerItem[];
}
