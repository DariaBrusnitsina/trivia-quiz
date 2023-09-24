// store.ts

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import questonsReducer from './questonReducer';
import { useDispatch } from 'react-redux';
import categoryReducer from './categoryReducer';

export const store = configureStore({
  reducer: {
    question: questonsReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
