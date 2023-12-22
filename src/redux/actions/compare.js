// add to compare
export const addTocompare = (data) => async (dispatch, getState) => {
  dispatch({
    type: "addToCompare",
    payload: data,
  });

  localStorage.setItem(
    "compareItems",
    JSON.stringify(getState().compare.compare)
  );
  return data;
};

// remove from compare
export const removeFromCompare = (data) => async (dispatch, getState) => {
  dispatch({
    type: "removeFromCompare",
    payload: data._id,
  });
  localStorage.setItem(
    "compareItems",
    JSON.stringify(getState().compare.compare)
  );
  return data;
};
