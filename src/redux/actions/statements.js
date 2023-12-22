import axios from "axios";
import { server } from "../../server";

// get all statements
export const getAllStatements = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllStatementsRequest",
    });

    const { data } = await axios.get(`${server}/statements/get-statements`);

    dispatch({
      type: "getAllStatementsSuccess",
      payload: data.statements,
    });
  } catch (error) {
    dispatch({
      type: "getAllStatementsFailed",
      payload: error.response.data.message,
    });
  }
};
