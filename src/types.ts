export interface Question {
  category: string;
  question: string;
  difficulty: string;
  type: string;
  incorrect_answers: string[];
  correct_answer: string;
}

export interface Answer extends Question {
  isCorrect: boolean;
}
