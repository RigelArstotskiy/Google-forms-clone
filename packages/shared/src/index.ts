export type QuestionType = "TEXT" | "MULTIPLE_CHOICE" | "CHECKBOX" | "DATE";

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface Answer {
  questionId: string;
  value: string;
}

export interface FormResponse {
  id: string;
  formId: string;
  answers: Answer[];
}

export interface QuestionInput {
  text: string;
  type: QuestionType;
  options?: string[];
}

export interface AnswerInput {
  questionId: string;
  value: string;
}
