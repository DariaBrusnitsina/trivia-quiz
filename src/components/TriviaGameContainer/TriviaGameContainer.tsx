import { useSelector } from 'react-redux';

import { Box, Button, Card, CircularProgress, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useStyles } from './styles';
import UserAnswerCard from '../UserAnswerCard/UserAnswerCard';
import { Answer, Question } from '../../types';
import QuestionCard from '../QuestionCard/QuestionCard';
import { RootState, useAppDispatch } from '../../store/store';
import { useGameStatus } from '../../hooks/useGameState';
import { resetState } from '../../store/questonReducer';
import GameOptionsForm from '../Form/GameOptionsForm';

function compareDifficulties(a: string, b: string) {
  const order = ['hard', 'medium', 'easy'];
  const index1 = order.indexOf(a);
  const index2 = order.indexOf(b);
  return index1 - index2;
}

const TriviaGameContainer = () => {
  const { queston, loading, error } = useSelector((state: RootState) => state.question);
  const { isGameOver, initQuestionsLength, answers, makeGameOverIsFalse } = useGameStatus();
  const { classes, cx } = useStyles();
  const dispatch = useAppDispatch();
  let difficulties: string[] = [];

  if (
    queston !== null &&
    Array.isArray(queston) &&
    queston.every((item) => typeof item === 'object' && 'difficulty' in item && typeof item.difficulty === 'string')
  ) {
    const setOfDifficulties = new Set(
      queston.map(function (d: Question) {
        return d.difficulty;
      })
    );

    difficulties = Array.from(setOfDifficulties).sort(compareDifficulties);
  }

  useEffect(() => {
    if (queston !== null && !loading) {
      initQuestionsLength(queston.length);
    }
  }, [queston]);

  function handlePlayAgain() {
    dispatch(resetState());
    makeGameOverIsFalse();
  }

  return (
    <>
      <Box
        className={cx(
          {
            [classes.hide]: queston !== null || error !== undefined || loading !== undefined,
          },
          {
            [classes.display]: queston === null && !error && !loading,
          }
        )}
      >
        <GameOptionsForm />
      </Box>

      <Box
        className={cx(
          {
            [classes.hide]: isGameOver,
          },
          {
            [classes.display]: !isGameOver,
          }
        )}
      >
        {error && (
          <Box className={classes.loader}>
            <Typography variant="h4" color="#E06B6E">
              Error!
            </Typography>
          </Box>
        )}
        {loading && (
          <Box className={classes.loader}>
            <CircularProgress color="secondary" />
          </Box>
        )}
        {queston !== null && queston.map((q: Question, i: number) => <QuestionCard key={i} question={q} index={i} />)}
      </Box>

      <Box
        className={cx(
          {
            [classes.hide]: !isGameOver,
          },
          {
            [classes.display]: isGameOver,
          }
        )}
      >
        <Card className={classes.card}>
          <Typography variant="h4">Your result</Typography>
          <Box className={classes.row}>
            {difficulties.map((d) => (
              <Typography key={d} variant="button" color={d === 'hard' ? '#E06B6E' : d === 'medium' ? 'orange' : '#75C684'}>
                {d}:{' '}
                {
                  answers.filter(function (a) {
                    return a.isCorrect && a.difficulty === d;
                  }).length
                }
              </Typography>
            ))}
          </Box>
          {answers.map((a: Answer, i: number) => (
            <UserAnswerCard key={i} answer={a} index={i} />
          ))}
          <Button sx={{ marginTop: '25px' }} onClick={handlePlayAgain}>
            Play again
          </Button>
        </Card>
      </Box>
    </>
  );
};

export default TriviaGameContainer;
