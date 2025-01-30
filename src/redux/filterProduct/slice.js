// redux/search/searchSlice.js
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { searchProducts } from "./operations";

const INITIAL_STATE = {
  searchResults: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState: INITIAL_STATE,
  extraReducers: (builder) =>
    builder
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.loading = false;
      })

      .addMatcher(isAnyOf(searchProducts.pending), (state) => {
        state.loading = true;
        state.error = false;
      })
      .addMatcher(isAnyOf(searchProducts.rejected), (state) => {
        state.loading = false;
        state.error = true;
      }),
});

export const searchReducer = searchSlice.reducer;
