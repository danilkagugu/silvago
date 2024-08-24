import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProductToBasket,
  deleteProductFromBasket,
  getBasketProduct,
  sendOrder,
} from "../../services/productApi";
export const getBasketInfo = createAsyncThunk(
  "basket/info",
  async (_, thunkAPI) => {
    try {
      const data = await getBasketProduct();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "basket/addItem",
  async ({ productId, quantity, volume, price }, thunkAPI) => {
    try {
      const data = await addProductToBasket(productId, quantity, volume, price);
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
      console.log("basket", basket);
      console.log("user", user);
      const data = await sendOrder({ user, basket });
      console.log("data: ", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "basketQ/deleteProduct",
  async ({ productId, volume }, { rejectWithValue }) => {
    try {
      const response = await deleteProductFromBasket({ productId, volume });
      return response; // Передаємо id і volume товару
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
