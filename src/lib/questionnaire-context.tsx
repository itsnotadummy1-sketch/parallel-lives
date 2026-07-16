"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { LifeCrossroad } from "@/types";

export const CROSSROADS: LifeCrossroad[] = [
  {
    id: "age-18",
    question: "At 18, you chose to...",
    options: [
      { label: "Go to university", category: "education", impact: 0.8 },
      { label: "Start working", category: "career", impact: 0.7 },
      { label: "Travel the world", category: "location", impact: 0.9 },
      { label: "Start a business", category: "career", impact: 0.9 },
    ],
  },
  {
    id: "age-22",
    question: "At 22, you moved to...",
    options: [
      { label: "Stay in hometown", category: "location", impact: 0.6 },
      { label: "Big city in home country", category: "location", impact: 0.7 },
      { label: "Move abroad", category: "location", impact: 0.9 },
      { label: "Off-grid somewhere remote", category: "location", impact: 1.0 },
    ],
  },
  {
    id: "career",
    question: "Your career became...",
    options: [
      { label: "Corporate ladder", category: "career", impact: 0.7 },
      { label: "Creative freelancer", category: "career", impact: 0.8 },
      { label: "Entrepreneur", category: "career", impact: 0.9 },
      { label: "Academic researcher", category: "career", impact: 0.7 },
    ],
  },
  {
    id: "love",
    question: "In love, you...",
    options: [
      { label: "Settled down early", category: "relationship", impact: 0.7 },
      { label: "Dated around a lot", category: "relationship", impact: 0.6 },
      { label: "Focused on yourself", category: "relationship", impact: 0.5 },
      { label: "Found an unconventional arrangement", category: "relationship", impact: 0.8 },
    ],
  },
  {
    id: "hobby",
    question: "Your defining hobby became...",
    options: [
      { label: "Music", category: "hobbies", impact: 0.5 },
      { label: "Athletics", category: "hobbies", impact: 0.6 },
      { label: "Writing", category: "hobbies", impact: 0.5 },
      { label: "Technology", category: "hobbies", impact: 0.6 },
      { label: "Nothing in particular", category: "hobbies", impact: 0.3 },
    ],
  },
  {
    id: "crisis",
    question: "When crisis hit, you...",
    options: [
      { label: "Fought through it head-on", category: "resilience", impact: 0.7 },
      { label: "Adapted and pivoted", category: "resilience", impact: 0.8 },
      { label: "Withdrew and reflected", category: "resilience", impact: 0.6 },
      { label: "Leaned on community", category: "resilience", impact: 0.7 },
    ],
  },
  {
    id: "wildcard",
    question: "The one risk you took was...",
    options: [
      { label: "Financial", category: "risk", impact: 0.8 },
      { label: "Relational", category: "risk", impact: 0.7 },
      { label: "Career", category: "risk", impact: 0.8 },
      { label: "Creative", category: "risk", impact: 0.7 },
      { label: "None", category: "risk", impact: 0.2 },
    ],
  },
];

interface QuestionnaireState {
  birthdate: string;
  answers: number[];
  setBirthdate: (date: string) => void;
  setAnswer: (stepIndex: number, answerIndex: number) => void;
  removeAnswer: (stepIndex: number) => void;
  clearAnswers: () => void;
  getEncodedData: () => string;
}

const QuestionnaireContext = createContext<QuestionnaireState | null>(null);

export function QuestionnaireProvider({ children }: { children: ReactNode }) {
  const [birthdate, setBirthdate] = useState("");
  const [answers, setAnswers] = useState<number[]>([]);

  const setAnswer = useCallback((stepIndex: number, answerIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[stepIndex] = answerIndex;
      return next;
    });
  }, []);

  const removeAnswer = useCallback((stepIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next.splice(stepIndex, 1);
      return next;
    });
  }, []);

  const clearAnswers = useCallback(() => {
    setAnswers([]);
  }, []);

  const getEncodedData = useCallback(() => {
    const data = { birthdate, answers };
    return btoa(JSON.stringify(data));
  }, [birthdate, answers]);

  return (
    <QuestionnaireContext.Provider
      value={{
        birthdate,
        answers,
        setBirthdate,
        setAnswer,
        removeAnswer,
        clearAnswers,
        getEncodedData,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnaire() {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error("useQuestionnaire must be used within a QuestionnaireProvider");
  }
  return context;
}
