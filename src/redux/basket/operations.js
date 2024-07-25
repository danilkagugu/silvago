import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProductToBasket,
  getBasketProduct,
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
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const data = await addProductToBasket(productId, quantity);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
