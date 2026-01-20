import { useState, useEffect } from "react";
import MathField from "./fields/MathField";
import type { TestData } from "@/types/interface";
import { $api } from "@/api/AxiosSevice";

interface TestPageProps {
  onBack?: () => void;
  test: TestData | null;
  onLogout?: () => void;
}

export default function TestPage({ test, onLogout }: TestPageProps) {
  const [currentAnswers, setCurrentAnswers] = useState<
    {
      partIndex: number;
      questionNumber: number;
      answer: string;
    }[]
  >([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswerChange = (
    questionNumber: number,
    answer: string,
    partIndex: number
  ) => {
    setCurrentAnswers((prev) => {
      const exists = prev.some(
      (item) =>
        item.partIndex === partIndex && item.questionNumber === questionNumber
      );
      if (exists) {
      return prev.map((item) =>
        item.partIndex === partIndex && item.questionNumber === questionNumber
        ? { ...item, answer }
        : item
      );
      } else {
      return [
        ...prev,
        { partIndex, questionNumber, answer }
      ];
      }
    });
  };

  const handleComplete = async () => {
   
    try {
      const { data } = await $api.post("/bottestresult/submit", {
        testId: test?.testId,
        telegramId: test?.telegramId,
        answers: currentAnswers,
      });
      if (data) {
        setIsCompleted(true);
      }
    } catch (err) {
      console.log(err);
    }
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
  console.log(currentAnswers);

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
            {test?.questions
              .map((q) => ({
                ...q,
                secondary: (q as any).partIndex === 2,
                isDual:
                  (q as any).partIndex === 2 || (q as any).partIndex === 1,
              }))
              .map(
                (question) =>
                  !question.secondary && (
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
                                    option,
                                    question.partIndex
                                  )
                                  }
                                  className={`h-10 rounded border text-sm font-medium transition-all duration-200 ${
                                  currentAnswers.find(
                                    (item) =>
                                    item.answer === option &&
                                    item.questionNumber === question.questionNumber &&
                                    item.partIndex === question.partIndex
                                  )
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
                      ) : question.isDual ? (
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
                              <div className="flex items-center gap-3">
                                <span>{"A)"}</span>
                                <div className="math-field-container w-full">
                                  <MathField
                                    value={
                                      currentAnswers.find(
                                        (item) =>
                                          item.questionNumber ===
                                            question.questionNumber &&
                                          item.partIndex === question.partIndex
                                      )?.answer || ""
                                    }
                                    onChange={(value) =>
                                      handleAnswerChange(
                                        question.questionNumber,
                                        value,
                                        question.partIndex
                                      )
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
                              <div className="flex items-center gap-3 mt-4">
                                <span>{"B)"}</span>
                                <div className="math-field-container w-full">
                                  <MathField
                                  value={
                                    currentAnswers.find(
                                    (item) =>
                                      item.questionNumber ===
                                      question.questionNumber &&
                                      item.partIndex === question.partIndex + 1
                                    )?.answer || ""
                                  }
                                  onChange={(value) =>
                                    handleAnswerChange(
                                    question.questionNumber,
                                    value,
                                    question.partIndex + 1
                                    )
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
                                    currentAnswers.find(
                                      (item) =>
                                        item.questionNumber ===
                                          question.questionNumber &&
                                        item.partIndex === question.partIndex
                                    )?.answer || ""
                                  }
                                  onChange={(value) =>
                                    handleAnswerChange(
                                      question.questionNumber,
                                      value,
                                      question.partIndex
                                    )
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
                  )
              )}
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
