import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addProductToFavorite,
  deleteProductFromFavorite,
  getFavoriteProduct,
  getProducts,
  productById,
} from "../../services/productApi";

export const getAllProduct = createAsyncThunk(
  "products/get",
  async (_, thunkAPI) => {
    try {
      const data = await getProducts();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getProductById = createAsyncThunk(
  "product/getById",
  async (slug, thunkAPI) => {
    try {
      const data = await productById(slug);
      // console.log("slug: ", slug);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getFavoriteProducts = createAsyncThunk(
  "favorite/get",
  async (_, thunkAPI) => {
    try {
      const data = await getFavoriteProduct();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProductFavorite = createAsyncThunk(
  "products/addFavoriteProduct",
  async (productId, thunkAPI) => {
    try {
      const data = await addProductToFavorite(productId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeProductFavorite = createAsyncThunk(
  "products/removeFavoriteProduct",
  async (productId, thunkAPI) => {
    try {
      const data = await deleteProductFromFavorite(productId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
