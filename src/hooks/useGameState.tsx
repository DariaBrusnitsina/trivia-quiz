import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Answer } from '../types';

export type GameState = {
  answers: Answer[];
  isGameOver: boolean;
  currentIndex: number;
  questionsLength: number;
  incrementCurrentIndex: () => void;
  initQuestionsLength: (length: number) => void;
  addAnswer: (answer: Answer) => void;
  makeGameOverIsFalse: () => void;
};

const GameStatusContext = createContext<null | GameState>(null);

export const useGameStatus = () => {
  const ctx = useContext(GameStatusContext);
  if (!ctx) {
    throw new Error('GameStatusContext not provided');
  }
  return ctx;
};

type Props = {
  children: ReactNode;
};

export const GameStatusProvider = ({ children }: Props) => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionsLength, setQuestionsLength] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const initQuestionsLength = useCallback((length: number) => {
    setQuestionsLength(length);
  }, []);

  const addAnswer = useCallback((answer: Answer) => {
    setAnswers((oldArray) => [...oldArray, answer]);
  }, []);

  const makeGameOverIsFalse = useCallback(() => {
    setIsGameOver(false);
  }, []);

  const incrementCurrentIndex = () => {
    if (currentIndex + 1 === questionsLength) {
      setIsGameOver(true);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const value = useMemo(
    () => ({
      answers,
      isGameOver,
      currentIndex,
      questionsLength,
      incrementCurrentIndex,
      initQuestionsLength,
      addAnswer,
      makeGameOverIsFalse,
    }),
    [answers, isGameOver, currentIndex, questionsLength, incrementCurrentIndex, initQuestionsLength, addAnswer, makeGameOverIsFalse]
  );

  return <GameStatusContext.Provider value={value}>{children}</GameStatusContext.Provider>;
};
