"use client";
import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Quiz() {
  const questions = [
    { question: "What is the capital of France?", answer: "paris" },
    { question: "What is the capital of Germany?", answer: "berlin" },
    { question: "What is the capital of Italy?", answer: "rome" },
    { question: "What is the capital of Spain?", answer: "madrid" },
    { question: "What is the capital of Canada?", answer: "ottawa" },
    { question: "What is the capital of Japan?", answer: "tokyo" },
    { question: "What is the capital of Australia?", answer: "canberra" },
    { question: "What is the capital of Brazil?", answer: "brasilia" },
    { question: "What is the capital of India?", answer: "new delhi" },
    { question: "What is the capital of Russia?", answer: "moscow" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const handleSubmit = () => {
    const trimmed = userAnswer.trim().toLowerCase();
    const correct = trimmed === questions[currentIndex].answer;
    if (correct) {
      setCorrectCount((c) => c + 1);
      setResult(`Correct! ${questions[currentIndex].question.split("What is the capital of")[1].trim()} is the capital.`);
    } else {
      setResult(`Wrong. The capital is ${questions[currentIndex].answer}.`);
    }
  };

  const handleNext = () => {
    setCurrentIndex((i) => i + 1);
    setUserAnswer("");
    setResult(null);
  };

  if (currentIndex >= questions.length) {
    return (
      <div className="flex flex-col gap-4 w-full max-w-md">
        <h2 className="text-xl font-semibold">Quiz Complete</h2>
        <p className="text-center">
          You answered {correctCount} out of {questions.length} correctly.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <h2 className="text-xl font-semibold">{questions[currentIndex].question}</h2>
      <Input
        type="text"
        placeholder="Your answer"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="w-full"
      />
      <Button onClick={handleSubmit} className="w-full">
        Submit
      </Button>
      {result && <p className="mt-2 text-center">{result}</p>}
      {result && currentIndex < questions.length - 1 && (
        <Button onClick={handleNext} className="w-full">
          Next
        </Button>
      )}
    </div>
  );
}
