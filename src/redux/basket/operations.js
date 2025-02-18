import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProductToBasket,
  addToCartApi,
  deleteProductFromBasket,
  getBasketProduct,
  getCartApi,
  productById,
  removeFromCartApi,
  sendOrder,
  updateProductQuantity,
} from "../../services/productApi";

export const getBasketInfo = createAsyncThunk(
  "basket/info",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const data = await getBasketProduct(token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "basket/addItem",
  async ({ slug, quantity, volume, tone }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const data = await addProductToBasket(
        slug,
        quantity,
        volume,
        tone,
        token
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCart = createAsyncThunk(
  "basket/getCart",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const userId = thunkAPI.getState().auth.userData.id;
      const data = await getCartApi(userId, token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "basket/addToCart",
  async ({ userId, productId, idTorgsoft, quantity }, thunkAPI) => {
    console.log("idTorgsoft: ", idTorgsoft);
    try {
      const token = thunkAPI.getState().auth.token;
      const data = await addToCartApi(
        userId,
        productId,
        idTorgsoft,
        quantity,
        token
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "basket/removeFromCart",
  async ({ userId, productId, idTorgsoft }, thunkAPI) => {
    console.log("userId: ", userId);
    console.log("idTorgsoft: ", idTorgsoft);
    try {
      const token = thunkAPI.getState().auth.token;
      const data = await removeFromCartApi(
        userId,
        productId,
        idTorgsoft,
        token
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "order/create",
  async ({ user, basket }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const data = await sendOrder({ user, basket, token });
      console.log("data: ", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "basket/deleteProduct",
  async ({ productId, volume }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await deleteProductFromBasket({
        productId,
        volume,
        token,
      });
      console.log("response: ", response);
      return response; // Передаємо id і volume товару
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateProductQuantityBasket = createAsyncThunk(
  "basket/updateProductQuantity",
  async ({ productId, volume, quantity, tone }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const response = await updateProductQuantity({
        productId,
        volume,
        quantity,
        tone,
        token,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "basket/fetchProductDetails",
  async (slug, { rejectWithValue }) => {
    console.log("slug: ", slug);
    try {
      const response = await productById(slug);
      return { slug, details: response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
