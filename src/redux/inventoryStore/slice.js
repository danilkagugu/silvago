import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  fetchAllSkins,
  fetchAllCategories,
  fetchAllBrands,
  fetchAllBrandsTorgsoft,
  fetchAllCategoriesTorgsoft,
  fetchAllFilters,
} from "./operations";

const INITIAL_STATE = {
  brands: [],
  brandsTorgsoft: [],
  skins: [],
  filters: [],
  categories: [],
  categoriesTorgsoft: [],
  loading: false,
  error: null,
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState: INITIAL_STATE,
  extraReducers: (builder) =>
    builder

      .addCase(fetchAllSkins.fulfilled, (state, { payload }) => {
        state.skins = payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAllFilters.fulfilled, (state, { payload }) => {
        state.filters = payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAllCategoriesTorgsoft.fulfilled, (state, action) => {
        state.categoriesTorgsoft = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAllBrands.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAllBrandsTorgsoft.fulfilled, (state, action) => {
        state.brandsTorgsoft = action.payload;
        // console.log("state.brandsTorgsoft: ", state.brandsTorgsoft);
        state.loading = false;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(
          fetchAllSkins.pending,
          fetchAllCategories.pending,
          fetchAllBrandsTorgsoft.pending,
          fetchAllCategoriesTorgsoft.pending,
          fetchAllBrands.pending,
          fetchAllFilters.pending
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchAllSkins.rejected,
          fetchAllFilters.rejected,
          fetchAllCategories.rejected,
          fetchAllBrandsTorgsoft.rejected,
          fetchAllCategoriesTorgsoft.rejected,
          fetchAllBrands.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      ),
});

export const inventoryInfoReducer = inventorySlice.reducer;
