import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Dispatch } from 'redux';

interface categoryState {
  category: any;
  loading: boolean;
  error: string | null;
}

const initialState: categoryState = {
  category: null,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<any>) => {
      state.category = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = categorySlice.actions;
export default categorySlice.reducer;

export const fetchCategoryData = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(fetchDataStart());
      const response = await axios.get('https://opentdb.com/api_category.php');
      dispatch(fetchDataSuccess(response.data.trivia_categories));
    } catch (error) {
      dispatch(fetchDataFailure('Что-то пошло не так'));
    }
  };
};
