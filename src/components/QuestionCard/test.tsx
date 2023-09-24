import { render, fireEvent, screen } from '@testing-library/react';
import QuestionCard from './QuestionCard';
import '@testing-library/jest-dom';

jest.mock('../../hooks/useGameState', () => ({
  useGameStatus: () => ({
    isGameOver: false,
    incrementCurrentIndex: jest.fn(),
    currentIndex: 0,
    addAnswer: jest.fn(),
    questionsLength: 5,
  }),
}));

const mockQuestion = {
  category: 'Category',
  difficulty: 'medium',
  question: 'What is the capital of France?',
  correct_answer: 'Paris',
  incorrect_answers: ['Berlin', 'Madrid', 'Rome'],
  type: 'multiliple',
};

test('renders QuestionCard correctly', () => {
  render(<QuestionCard question={mockQuestion} index={0} />);

  // Check if the question text is displayed
  const questionText = screen.getByText(mockQuestion.question);
  expect(questionText).toBeInTheDocument();

  // Check if answer options are displayed
  const answerOptions = screen.getAllByRole('radio');
  expect(answerOptions.length).toBe(mockQuestion.incorrect_answers.length + 1);

  // Select an answer option
  const selectedOption = screen.getByLabelText(mockQuestion.correct_answer);
  fireEvent.click(selectedOption);

  // Check if the "Next question" button is enabled after selecting an option
  const nextButton = screen.getByText('Next question');
  fireEvent.click(selectedOption);
  expect(nextButton).toBeEnabled();
});
