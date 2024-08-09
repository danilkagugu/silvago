// redux/search/searchSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchProducts as searchProductsApi } from "../../services/productApi";

const INITIAL_STATE = {
  searchResults: [],
  loading: false,
  error: null,
};

export const searchProducts = createAsyncThunk(
  "search/searchProducts",
  async (query, thunkAPI) => {
    try {
      const data = await searchProductsApi(query);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: INITIAL_STATE,
  extraReducers: (builder) =>
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.loading = false;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }),
});

export const selectSearchResults = (state) => state.search.searchResults;
export const selectSearchLoading = (state) => state.search.loading;
export const selectSearchError = (state) => state.search.error;

export const searchReducer = searchSlice.reducer;
