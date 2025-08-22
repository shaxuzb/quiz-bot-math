export interface TestQuestionData {
  answerType: number;
  options: string[] | null;
  questionNumber: number;
}
export interface TestData {
  canPass: boolean;
  quantity: number;
  telegramId: number;
  testId: number;
  questions: TestQuestionData[];
}
