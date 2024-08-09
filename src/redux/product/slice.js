import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getAllProduct, getProductById } from "./operations";

const INITIAL_STATE = {
  product: [],
  productDetails: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState: INITIAL_STATE,
  extraReducers: (builder) =>
    builder
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.productDetails = action.payload;
        state.loading = false;
      })

      .addMatcher(
        isAnyOf(getAllProduct.pending, getProductById.pending),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(getAllProduct.rejected, getProductById.rejected),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      ),
});

export const productsReducer = productSlice.reducer;
