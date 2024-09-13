import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProductToBasket,
  deleteProductFromBasket,
  getBasketProduct,
  sendOrder,
  updateProductQuantity,
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
  async ({ slug, quantity, volume, price }, thunkAPI) => {
    // console.log("slug: ", slug);
    try {
      const data = await addProductToBasket(slug, quantity, volume, price);
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
  async ({ productId, volume }, { rejectWithValue }) => {
    try {
      const response = await deleteProductFromBasket({ productId, volume });
      return response; // Передаємо id і volume товару
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProductQuantityBasket = createAsyncThunk(
  "basket/updateProductQuantity",
  async ({ productId, volume, quantity }, { rejectWithValue }) => {
    try {
      console.log("productId", productId);
      const response = await updateProductQuantity({
        productId,
        volume,
        quantity,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
