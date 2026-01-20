export interface TestQuestionData {
  answerType: number;
  options: string[] | null;
  questionNumber: number;
  partIndex: number;
}
export interface TestData {
  canPass: boolean;
  quantity: number;
  telegramId: number;
  testId: number;
  questions: TestQuestionData[];
}
