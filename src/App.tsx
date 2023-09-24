import { useEffect } from 'react';
import { Typography } from '@mui/material';
import TriviaGameContainer from './components/TriviaGameContainer/TriviaGameContainer';
import { fetchCategoryData } from './store/categoryReducer';
import { useAppDispatch } from './store/store';

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
      <TriviaGameContainer />
    </>
  );
};

export default App;
