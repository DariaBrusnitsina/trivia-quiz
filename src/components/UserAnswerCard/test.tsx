import { render, screen } from '@testing-library/react';
import UserAnswerCard from './UserAnswerCard';
import '@testing-library/jest-dom';

describe('UserAnswerCard', () => {
  it('отображает ответ пользователя с правильными данными', () => {
    // Создаем фиктивные данные для ответа пользователя
    const answer = {
      difficulty: 'easy',
      question: 'What is the capital of France?',
      correct_answer: 'Paris',
      isCorrect: true,
      category: 'Cities',
      type: 'multiple',
      incorrect_answers: ['Moscow', 'London'],
    };

    const index = 0;

    render(<UserAnswerCard answer={answer} index={index} />);

    // Проверяем, что компонент правильно отображает данные
    expect(screen.getByText('1')).toBeInTheDocument(); // Проверяем номер вопроса
    expect(screen.getByText('easy')).toBeInTheDocument(); // Проверяем сложность
    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument(); // Проверяем текст вопроса
    expect(screen.getByText('Correct answer: Paris')).toBeInTheDocument(); // Проверяем правильный ответ
    expect(screen.getByText('Your answer is correct')).toBeInTheDocument(); // Проверяем сообщение о правильности ответа
  });

  it('отображает ответ пользователя с неправильными данными', () => {
    // Создаем фиктивные данные для ответа пользователя
    const answer = {
      difficulty: 'medium',
      question: 'What is 2 + 2?',
      correct_answer: '4',
      isCorrect: false,
      category: 'Mathematical',
      type: 'multiple',
      incorrect_answers: ['100', '5'],
    };

    const index = 1;

    render(<UserAnswerCard answer={answer} index={index} />);

    // Проверяем, что компонент правильно отображает данные
    expect(screen.getByText('2')).toBeInTheDocument(); // Проверяем номер вопроса
    expect(screen.getByText('medium')).toBeInTheDocument(); // Проверяем сложность
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument(); // Проверяем текст вопроса
    expect(screen.getByText('Correct answer: 4')).toBeInTheDocument(); // Проверяем правильный ответ
    expect(screen.getByText('Your answer is wrong')).toBeInTheDocument(); // Проверяем сообщение о неправильности ответа
  });
});
