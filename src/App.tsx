import { useState } from "react";
import LoginPage from "./components/LoginPage";
import TestPage from "./components/TestPage";
import type { TestData } from "./types/interface";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<TestData | null>(null);

  const handleLogout = () => {
    setIsLoggedIn(null);
  };
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.expand();
  }
  window.Telegram.WebApp.ready();

  if (isLoggedIn) {
    return <TestPage test={isLoggedIn} onLogout={handleLogout} />;
  }

  return <LoginPage setIsLoggedIn={setIsLoggedIn} />;
}
