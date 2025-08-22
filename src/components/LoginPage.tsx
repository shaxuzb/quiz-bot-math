import { $api } from "@/api/AxiosSevice";
import type { TestData } from "@/types/interface";
import { useState } from "react";

interface LoginPageProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<TestData | null>>;
}
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        downloadFile(arg0: { url: any; file_name: string }): unknown;
        expand(): unknown;
        initDataUnsafe: any;
        close(): unknown;
        initData: string;
      };
    };
  }
}
export default function LoginPage({ setIsLoggedIn }: LoginPageProps) {
  const [testId, setTestId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await $api.get("bottest/check-access", {
        params: {
          code: testId,
          telegramId: window.Telegram.WebApp.initDataUnsafe.user?.id,
        },
      });

      if (data) {
        if (data.canPass) {
          setIsLoggedIn({
            ...data,
            testId: testId,
            telegramId: window.Telegram.WebApp.initDataUnsafe.user?.id,
          });
          setLoading(false);
          setError("");
        } else {
          setLoading(false);
          setError("Sizga ruxsat yuq");
          setIsLoggedIn(null);
        }
      }
    } catch (err) {
      setLoading(false);
      setError("Test Id si noto'g'ri terildi");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={testId}
                onChange={(e) => setTestId(e.target.value)}
                placeholder="Test id kiriting"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              className={`${
                loading ? "opacity-80 pointer-events-none" : ""
              } w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
            >
              Davom Etish
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
