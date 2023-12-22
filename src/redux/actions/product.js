import axios from "axios";
import { server } from "../../server";
// create product
export const createProduct =
  (
    name,
    description,
    category,
    tags,
    originalPrice,
    discountPrice,
    stock,
    shopId,
    images
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "productCreateRequest",
      });

      const { data } = await axios.post(
        `${server}/product/create-product`,
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId,
        images
      );
      dispatch({
        type: "productCreateSuccess",
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: "productCreateFail",
        payload: error.response.data.message,
      });
    }
  };

// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });
    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message,
    });
  }
};
// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });
    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message,
    });
  }
};
// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });
    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};
// Action Types
export const UPDATE_PRODUCT_REQUEST = "UPDATE_PRODUCT_REQUEST";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_FAILURE = "UPDATE_PRODUCT_FAILURE";
// Action Creators
export const updateProductRequest = () => {
  return {
    type: UPDATE_PRODUCT_REQUEST,
  };
};
export const updateProductSuccess = () => {
  return {
    type: UPDATE_PRODUCT_SUCCESS,
  };
};
export const updateProductFailure = (error) => {
  return {
    type: UPDATE_PRODUCT_FAILURE,
    payload: error,
  };
};

export const getProduct = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: "getProductRequest",
    });

    const { data } = await axios.get(
      `${server}/product/get-product/${productId}`
    );
    dispatch({
      type: "getProductSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "getProductFailed",
      payload: error.response.data.message,
    });
  }
};

export const updateProduct =
  (productId, updatedProduct) => async (dispatch) => {
    try {
      dispatch(updateProductRequest());
      const { data } = await axios.put(
        `${server}/product/update-product/${productId}`,
        updatedProduct
      );
      dispatch(updateProductSuccess(data));
    } catch (error) {
      dispatch(updateProductFailure(error.message));
    }
  };
