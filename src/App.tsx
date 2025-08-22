import { useState } from "react";
import LoginPage from "./components/LoginPage";
import TestPage from "./components/TestPage";
import type { TestData } from "./types/interface";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<TestData | null>(null);

  const handleLogout = () => {
    setIsLoggedIn(null);
  };

  if (isLoggedIn) {
    return <TestPage test={isLoggedIn} onLogout={handleLogout} />;
  }

  return <LoginPage setIsLoggedIn={setIsLoggedIn} />;
}
