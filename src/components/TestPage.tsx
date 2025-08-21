import { useState, useEffect } from "react";
import MathField from "./fields/MathField";

interface Question {
  questionNumber: number;
  answerType: number;
  options: string[] | null;
}

interface TestData {
  canPass: boolean;
  quantity: number;
  questions: Question[];
}

interface TestPageProps {
  onBack?: () => void;
  onLogout?: () => void;
}

export default function TestPage({ onLogout }: TestPageProps) {
  const [currentAnswers, setCurrentAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Sample test data based on your JSON
  const testData: TestData = {
    canPass: true,
    quantity: 45,
    questions: [
      // Questions 1-35: Multiple choice (answerType: 1)
      ...Array.from({ length: 35 }, (_, i) => ({
        questionNumber: i + 1,
        answerType: 1,
        options: ["A", "B", "C", "D"],
      })),
      // Questions 36-45: Text input (answerType: 0)
      ...Array.from({ length: 10 }, (_, i) => ({
        questionNumber: i + 36,
        answerType: 0,
        options: null,
      })),
    ],
  };

  const handleAnswerChange = (questionNumber: number, answer: string) => {
    setCurrentAnswers((prev) => ({
      ...prev,
      [questionNumber]: answer,
    }));
  };

  const handleComplete = () => {
    setIsCompleted(true);
  };

  // Auto redirect after 2 seconds when completed
  useEffect(() => {
    if (isCompleted && onLogout) {
      const timer = setTimeout(() => {
        onLogout();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isCompleted, onLogout]);

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Javoblaringiz muvaffaqiyatli qabul qilindi
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <h1 className="text-xl font-medium text-gray-800 text-center">
              Test javoblarini kiriting:
            </h1>
          </div>

          {/* Questions */}
          <div className="p-6 space-y-6">
            {testData.questions.map((question) => (
              <div key={question.questionNumber} className="space-y-3">
                {question.answerType === 1 ? (
                  // Multiple choice question
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-sm font-medium text-gray-700">
                        {question.questionNumber}
                      </div>
                      <div className="flex-1 grid grid-cols-4 gap-2">
                        {question.options?.map((option) => (
                          <button
                            key={option}
                            onClick={() =>
                              handleAnswerChange(
                                question.questionNumber,
                                option
                              )
                            }
                            className={`h-10 rounded border text-sm font-medium transition-all duration-200 ${
                              currentAnswers[question.questionNumber] === option
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Text input question
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-sm font-medium text-gray-700 mt-1">
                        {question.questionNumber}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-600 mb-2">
                          Matematik javobni kiriting
                        </div>
                        <div className="math-field-container">
                          <MathField
                            value={
                              currentAnswers[question.questionNumber] || ""
                            }
                            onChange={(value) =>
                              handleAnswerChange(question.questionNumber, value)
                            }
                            style={{
                              width: "100%",
                              padding: "8px 12px",
                              border: "1px solid #d1d5db",
                              borderRadius: "6px",
                              fontSize: "14px",
                              minHeight: "40px",
                              backgroundColor: "#ffffff",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Complete Button */}
          <div className="border-t border-gray-200 p-6">
            <button
              onClick={handleComplete}
              className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 bg-purple-600 hover:bg-purple-700 text-white"
            >
              Yakunlash
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
