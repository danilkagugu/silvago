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
// export const deleteProduct = createAsyncThunk(
//   "basket/deleteItem",
//   async (productId, thunkAPI) => {
//     try {
//       const data = await deleteProductFromBasket(productId);
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

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
  "basket/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await deleteProductFromBasket(productId);
      return response.data; // Передайте дані, які ви хочете використовувати для оновлення стейту
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
