import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchProductApi } from "../../services/api";

export const searchProducts = createAsyncThunk(
  "search/searchProducts",
  async (query, thunkAPI) => {
    try {
      if (!query || query.trim() === "") {
        return []; // Якщо `query` пустий, повертаємо порожній масив
      }
      const data = await searchProductApi(query.trim());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
