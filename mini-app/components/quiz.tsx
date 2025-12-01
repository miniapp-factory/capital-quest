"use client";
import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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
  const [isCorrect, setIsCorrect] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const trimmed = userAnswer.trim().toLowerCase();
    const correct = trimmed === questions[currentIndex].answer;
    if (correct) {
      setCorrectCount((c) => c + 1);
      setResult(`Correct! ${questions[currentIndex].question.split("What is the capital of")[1].trim()} is the capital.`);
      setIsCorrect(true);
    } else {
      setResult(`Wrong. The capital is ${questions[currentIndex].answer}.`);
      setIsCorrect(false);
    }
    setSubmitted(true);
  };

  const handleNext = () => {
    setCurrentIndex((i) => i + 1);
    setUserAnswer("");
    setResult(null);
    setIsCorrect(false);
    setSubmitted(false);
  };

  if (currentIndex >= questions.length) {
    return (
      <Card className="flex flex-col gap-4 w-full max-w-md p-6">
        <h2 className="text-xl font-semibold">Quiz Complete</h2>
        <p className="text-center">
          You answered {correctCount} out of {questions.length} correctly.
        </p>
        <Button onClick={() => { setCurrentIndex(0); setCorrectCount(0); setUserAnswer(""); setResult(null); }} className="w-full mt-4">
          Restart Quiz
        </Button>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Progress value={(currentIndex + 1) / questions.length * 100} className="w-full mb-4" />
      <h2 className="text-xl font-semibold">{questions[currentIndex].question}</h2>
      <Input
        type="text"
        placeholder="Your answer"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="w-full"
      />
      <Button onClick={handleSubmit} className="w-full" disabled={submitted}>
        Submit
      </Button>
      {result && <p className="mt-2 text-center">{result}</p>}
      <p className="text-center">Correct: {correctCount} / {currentIndex + 1}</p>
      {result && isCorrect && currentIndex < questions.length - 1 && (
        <Button onClick={handleNext} className="w-full">
          Next
        </Button>
      )}
    </div>
  );
}
