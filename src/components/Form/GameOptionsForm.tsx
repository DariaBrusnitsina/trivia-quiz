import { ChangeEvent, FormEvent, useState } from 'react';
import {
  Slider,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  SelectChangeEvent,
  Button,
  CircularProgress,
} from '@mui/material';
import { useStyles } from './styles';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { fetchQuestionData } from '../../store/questonReducer';
interface FormData {
  numberOfQuestions: number;
  difficulty: string;
  category: number;
}

interface Category {
  id: number;
  name: string;
}

const marks = [
  {
    value: 10,
  },
  {
    value: 20,
  },
  {
    value: 30,
  },
  {
    value: 40,
  },
  {
    value: 50,
  },
];

function GameOptionsForm() {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const { category, loading, error } = useSelector((state: RootState) => state.category);

  const initialFormData: FormData = {
    numberOfQuestions: 10,
    difficulty: 'any',
    category: 0,
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setFormData({ ...formData, numberOfQuestions: newValue as number });
  };

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, difficulty: event.target.value });
  };

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    setFormData({ ...formData, category: event.target.value as number });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchQuestionData(formData.numberOfQuestions, formData.category, formData.difficulty));
  };

  return (
    <Box className={classes.card}>
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
      {category !== null && (
        <form onSubmit={handleSubmit}>
          <Typography variant="h4">Select Game Options</Typography>

          <Box className={classes.column}>
            <Typography variant="overline">Number of Questions</Typography>
            <Slider
              sx={{ marginTop: '25px' }}
              value={formData.numberOfQuestions}
              onChange={handleSliderChange}
              aria-labelledby="slider-label"
              valueLabelDisplay="auto"
              step={1}
              marks={marks}
              min={1}
              max={50}
            />
          </Box>

          <Box className={classes.column}>
            <Typography variant="overline">Select Difficulty</Typography>
            <RadioGroup row aria-label="radio-group" name="radio-group" value={formData.difficulty} onChange={handleRadioChange}>
              <FormControlLabel value="any" control={<Radio />} label="Any" />
              <FormControlLabel value="hard" control={<Radio />} label="Hard" />
              <FormControlLabel value="medium" control={<Radio />} label="Medium" />
              <FormControlLabel value="easy" control={<Radio />} label="Easy" />
            </RadioGroup>
          </Box>

          <Box className={classes.column}>
            <Typography variant="overline">Select Category</Typography>
            <Select fullWidth value={formData.category} onChange={handleSelectChange} data-testid="my-wrapper">
              <MenuItem value={0}>Any</MenuItem>
              {category.map((c: Category) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Button sx={{ marginTop: '25px' }} type="submit">
            Start Game
          </Button>
        </form>
      )}
    </Box>
  );
}

export default GameOptionsForm;
