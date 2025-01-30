import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchProductApi } from "../../services/api";

export const searchProducts = createAsyncThunk(
  "search/searchProducts",
  async (query, thunkAPI) => {
    try {
      const data = await searchProductApi(query);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
