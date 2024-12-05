export type QuestionType = "multipleChoice" | "textEntry" | "matrixTable" | "slider";

export interface Question {
  type: QuestionType;
  name: string;
  answers?: string[]; // For multipleChoice or matrixTable questions
  rows?: string[]; // For matrixTable (rows like: questions or options)
  columns?: string[]; // For matrixTable (columns like: options or ratings)
  min?: number; // For slider (minimum value)
  max?: number; // For slider (maximum value)
  step?: number; // For slider (step value)
}
