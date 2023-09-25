import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Dispatch } from "redux";
import { Question } from "../types";

interface questionState {
  queston: Question[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: questionState = {
  queston: null,
  loading: false,
  error: null,
};

const questonSlice = createSlice({
  name: "queston",
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<Question[]>) => {
      state.queston = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  resetState,
} = questonSlice.actions;
export default questonSlice.reducer;

export const fetchQuestionData = (
  amount: number,
  category: number,
  difficulty: string
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(fetchDataStart());
      const url = `https://opentdb.com/api.php?amount=${amount}${
        category !== 0 ? "&category=" + category : ""
      }${difficulty !== "any" ? "&difficulty=" + difficulty : ""}`;

      const response = await axios.get(url);
      dispatch(fetchDataSuccess(response.data.results));
    } catch (error) {
      dispatch(fetchDataFailure("Что-то пошло не так"));
    }
  };
};
