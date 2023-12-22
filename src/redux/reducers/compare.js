import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  compare: localStorage.getItem("compareItems")
    ? JSON.parse(localStorage.getItem("compareItems"))
    : [],
};

export const compareReducer = createReducer(initialState, {
  addToCompare: (state, action) => {
    const item = action.payload;
    const isItemExist = state.compare.find((i) => i._id === item._id);
    if (isItemExist) {
      return {
        ...state,
        compare: state.compare.map((i) =>
          i._id === isItemExist._id ? item : i
        ),
      };
    } else {
      return {
        ...state,
        compare: [...state.compare, item],
      };
    }
  },

  removeFromCompare: (state, action) => {
    return {
      ...state,
      compare: state.compare.filter((i) => i._id !== action.payload),
    };
  },
});
