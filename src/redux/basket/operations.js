import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProductToBasket,
  deleteProductFromBasket,
  getBasketProduct,
  productById,
  sendOrder,
  updateProductQuantity,
} from "../../services/productApi";
// import { getProductById } from "../product/operations";

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
  async ({ slug, quantity, volume, tone }, thunkAPI) => {
    console.log("tone: ", tone);
    try {
      const data = await addProductToBasket(slug, quantity, volume, tone);
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
      console.log("response: ", response);
      return response; // Передаємо id і volume товару
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProductQuantityBasket = createAsyncThunk(
  "basket/updateProductQuantity",
  async ({ productId, volume, quantity, tone }, { rejectWithValue }) => {
    try {
      console.log("productId", productId);
      console.log("volume", volume);
      console.log("quantity", quantity);
      const response = await updateProductQuantity({
        productId,
        volume,
        quantity,
        tone,
      });
      console.log("response", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
