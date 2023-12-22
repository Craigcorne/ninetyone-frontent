import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const statementsReducer = createReducer(initialState, {
  // get all statements
  getAllStatementsRequest: (state) => {
    state.isLoading = true;
  },
  getAllStatementsSuccess: (state, action) => {
    state.isLoading = false;
    state.statements = action.payload;
  },
  getAllStatementsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
