import { useState } from "react";
import MathField from "./components/fields/Mathfield";
export default function App() {
  const [question, setQuestion] = useState("(3x+6)^2");
  return (
    <div>
      <MathField
        value={question}
        onChange={setQuestion}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "8px",
          border: "1px solid rgba(0, 0, 0, .3)",
          boxShadow: "0 0 8px rgba(0, 0, 0, .2)",
        }}
      />
      <h1>{question}</h1>
    </div>
  );
}
