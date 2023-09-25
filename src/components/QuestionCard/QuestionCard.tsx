import { Card, CardContent, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Box, Button } from '@mui/material';
import { useStyles } from './styles';
import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { Question } from '../../types';
import { useGameStatus } from '../../hooks/useGameState';
import decodeHTML from '../../utils/decodeHTML';

interface Props {
  question: Question;
  index: number;
}

const QuestionCard = ({ question, index }: Props) => {
  const { classes, cx } = useStyles();
  const { isGameOver, incrementCurrentIndex, currentIndex, addAnswer, questionsLength } = useGameStatus();
  const [value, setValue] = useState('');
  const answerVariants = useMemo(() => [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5), []);

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isCorrect = value === question.correct_answer;
    incrementCurrentIndex();
    addAnswer({ ...question, isCorrect });
  };

  return (
    <Card
      className={cx(
        classes.card,
        {
          [classes.display]: currentIndex === index && !isGameOver,
        },
        {
          [classes.hide]: currentIndex !== index && !isGameOver,
        }
      )}
    >
      <Box className={classes.row}>
        <Typography variant="overline">{question.category}</Typography>
        <Typography variant="button" color={question.difficulty === 'hard' ? 'red' : question.difficulty === 'medium' ? 'orange' : 'green'}>
          {question.difficulty}
        </Typography>
      </Box>

      <CardContent>
        <Typography variant="h4">{decodeHTML(question.question)}</Typography>
      </CardContent>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <RadioGroup className={classes.questions} value={value} onChange={handleRadioChange}>
            {answerVariants.map((option, j) => (
              <FormControlLabel key={j} value={option} control={<Radio />} label={decodeHTML(option)} />
            ))}
          </RadioGroup>
        </FormControl>

        <Box className={classes.row}>
          <Typography variant="button">
            {currentIndex + 1} / {questionsLength}
          </Typography>
          <Button
            disabled={!value}
            type="submit"
          >
            Next question
          </Button>
        </Box>
      </form>
    </Card>
  );
};

export default QuestionCard;
