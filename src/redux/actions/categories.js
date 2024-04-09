import axios from "axios";
import { server } from "../../server";

export const DELETE_CATEGORY = "DELETE_CATEGORY";

// categoriesActions.js

export const deleteCategory = (categoryId) => ({
  type: DELETE_CATEGORY,
  payload: categoryId,
});

export const setCategories = (categories) => ({
  type: "SET_CATEGORIES",
  payload: categories,
});

export const deleteCategoryThunk = (categoryId) => async (dispatch) => {
  try {
    await axios.delete(`/api/categories/${categoryId}`, {
      withCredentials: true,
    });
    dispatch(deleteCategory(categoryId));
    console.log("Category deleted successfully");
  } catch (error) {
    console.error("Error:", error.response.data);
  }
};
export const getAllCategory = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllcategoryRequest",
    });

    const { data } = await axios.get(`${server}/category/categories`);
    dispatch({
      type: "getAllcategorySuccess",
      payload: data.categories,
    });
  } catch (error) {
    dispatch({
      type: "getAllcategoryFailed",
      payload: error.response.data.message,
    });
  }
};
