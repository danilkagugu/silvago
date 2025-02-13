import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProductToBasket,
  deleteProductFromBasket,
  getBasketProduct,
  productById,
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
    try {
      const response = await productById(slug);
      console.log("response: ", response);
      return { slug, details: response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
