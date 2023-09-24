import { useEffect } from 'react';
import TriviaGame from './components/TriviaGameContainer/TriviaGameContainer';
import { useAppDispatch } from './store/store';
import { Typography } from '@mui/material';
import { fetchCategoryData } from './store/categoryReducer';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategoryData());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h2" textAlign="center">
        Trivia Game
      </Typography>
      <TriviaGame />
    </>
  );
};

export default App;
