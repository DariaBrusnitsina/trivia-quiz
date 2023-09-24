import { Box, Typography } from '@mui/material';
import { useStyles } from './styles';
import decodeHTML from '../../utils/decodeHTML';
import { Answer } from '../../types';

interface Props {
  answer: Answer;
  index: number;
}

const UserAnswerCard = ({ answer, index }: Props) => {
  const { classes, cx } = useStyles();

  return (
    <Box className={classes.answer}>
      <Box>
        <Typography
          variant="h5"
          className={cx(
            {
              [classes.true]: answer.isCorrect,
            },
            {
              [classes.false]: !answer.isCorrect,
            }
          )}
        >
          {index + 1}
        </Typography>
        <Typography variant="overline">{answer.difficulty}</Typography>
      </Box>

      <Box sx={{ width: '85%' }}>
        <Typography variant="subtitle1" textAlign="start">
          {decodeHTML(answer.question)}
        </Typography>

        <Box className={classes.row}>
          <Typography variant="subtitle2" textAlign="start">
            Correct answer: {decodeHTML(answer.correct_answer)}
          </Typography>
          <Typography
            variant="overline"
            className={cx(
              {
                [classes.true]: answer.isCorrect,
              },
              {
                [classes.false]: !answer.isCorrect,
              }
            )}
          >
            {answer.isCorrect ? 'Your answer is correct' : 'Your answer is wrong'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserAnswerCard;
