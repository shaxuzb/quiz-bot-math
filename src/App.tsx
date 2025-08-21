import { useState } from "react";
import LoginPage from "./components/LoginPage";
import TestPage from "./components/TestPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const handleLogin = (id: string) => {
    setCurrentUser(id);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser("");
  };

  if (isLoggedIn) {
    return <TestPage onLogout={handleLogout} />;
  }

  return <LoginPage onLogin={handleLogin} />;
}
