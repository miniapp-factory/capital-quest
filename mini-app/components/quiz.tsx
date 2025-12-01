"use client";
import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Quiz() {
  const [question] = useState("What is the capital of France?");
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = () => {
    const trimmed = answer.trim().toLowerCase();
    if (trimmed === "paris") {
      setResult("Correct! Paris is the capital of France.");
    } else {
      setResult(`Wrong. The capital of France is Paris. You guessed "${answer}".`);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <h2 className="text-xl font-semibold">{question}</h2>
      <Input
        type="text"
        placeholder="Your answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full"
      />
      <Button onClick={handleSubmit} className="w-full">
        Submit
      </Button>
      {result && <p className="mt-2 text-center">{result}</p>}
    </div>
  );
}
