"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { QuizQuestion } from "@/data/conceptQuizzes";

function shuffleArray<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function shuffleQuestions(questions: QuizQuestion[]): QuizQuestion[] {
  const shuffled = shuffleArray(questions).map((q) => {
    const correctAnswer = q.options[q.correctIndex];
    const shuffledOptions = shuffleArray(q.options);
    const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);
    return { ...q, options: shuffledOptions, correctIndex: newCorrectIndex };
  });
  return shuffled;
}

interface ConceptQuizProps {
  questions: QuizQuestion[];
  dayNumber: number;
  conceptCompleted: boolean;
}

export function ConceptQuiz({
  questions,
  dayNumber,
  conceptCompleted,
}: ConceptQuizProps) {
  const router = useRouter();
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>(() =>
    questions.length > 0 ? shuffleQuestions(questions) : []
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQuizDespiteCompleted, setShowQuizDespiteCompleted] = useState(false);

  const question = shuffledQuestions[currentIndex];
  const isLastQuestion = currentIndex === shuffledQuestions.length - 1;

  async function handleSelect(optionIndex: number) {
    if (answered) return;
    setSelectedIndex(optionIndex);
    setAnswered(true);
    const isCorrect = optionIndex === question.correctIndex;
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
    }
  }

  function handleNext() {
    if (isLastQuestion) {
      const allCorrect = correctCount === shuffledQuestions.length;
      setShowResult(true);
      if (allCorrect) {
        markConceptDone();
      }
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setAnswered(false);
    }
  }

  const handleRetry = useCallback(() => {
    setShuffledQuestions(shuffleQuestions(questions));
    setCurrentIndex(0);
    setSelectedIndex(null);
    setAnswered(false);
    setCorrectCount(0);
    setShowResult(false);
    setShowQuizDespiteCompleted(true);
  }, [questions]);

  async function markConceptDone() {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/progress/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dayNumber, field: "conceptCompleted", value: true }),
      });
      if (res.ok) {
        router.refresh();
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (conceptCompleted && !showQuizDespiteCompleted) {
    return (
      <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
            ✓ Concept mastered! You passed the quiz.
          </p>
          <button
            type="button"
            onClick={handleRetry}
            className="shrink-0 px-3 py-1.5 text-sm font-medium rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700"
          >
            Restart quiz
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0 || shuffledQuestions.length === 0) {
    return null;
  }

  if (showResult) {
    const passed = correctCount === questions.length;
    return (
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
        <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
          Quiz result
        </h3>
        {passed ? (
          <>
            <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-2">
              All {shuffledQuestions.length} correct! Concept task marked as done.
            </p>
            {isSubmitting && (
              <p className="text-sm text-zinc-500 mb-2">Updating…</p>
            )}
            <button
              type="button"
              onClick={handleRetry}
              className="px-3 py-1.5 text-sm font-medium rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700"
            >
              Restart quiz
            </button>
          </>
        ) : (
          <>
            <p className="text-zinc-700 dark:text-zinc-300 mb-3">
              You got {correctCount} of {shuffledQuestions.length} correct. Review the concept and try again.
            </p>
            <button
              type="button"
              onClick={handleRetry}
              className="px-3 py-1.5 text-sm font-medium rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700"
            >
              Restart quiz
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
            Concept quiz
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Question {currentIndex + 1} of {shuffledQuestions.length}
          </p>
        </div>
        <button
          type="button"
          onClick={handleRetry}
          className="shrink-0 px-3 py-1.5 text-sm font-medium rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700"
        >
          Restart
        </button>
      </div>
      <p className="text-zinc-900 dark:text-zinc-100 font-medium mb-4">
        {question.question}
      </p>
      <ul className="space-y-2">
        {question.options.map((option, i) => {
          const isSelected = selectedIndex === i;
          const isCorrect = i === question.correctIndex;
          const showCorrect = answered && isCorrect;
          const showWrong = answered && isSelected && !isCorrect;
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => handleSelect(i)}
                disabled={answered}
                className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors
                  ${!answered ? "hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50" : ""}
                  ${isSelected ? "border-zinc-400 dark:border-zinc-500" : "border-zinc-200 dark:border-zinc-700"}
                  ${showCorrect ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200" : ""}
                  ${showWrong ? "border-red-500 bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-200" : ""}
                  ${answered && !isSelected && !isCorrect ? "opacity-60" : ""}
                  disabled:pointer-events-none
                `}
              >
                {option}
                {showCorrect && " ✓"}
                {showWrong && " ✗"}
              </button>
            </li>
          );
        })}
      </ul>
      {answered && (
        <button
          type="button"
          onClick={handleNext}
          className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          {isLastQuestion ? "See result" : "Next question"}
        </button>
      )}
    </div>
  );
}
