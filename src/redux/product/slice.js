import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addProductFavorite,
  getAllProduct,
  getFavoriteProducts,
  getProductById,
  removeProductFavorite,
} from "./operations";

const INITIAL_STATE = {
  product: [],
  favorites: [],
  favoritesQuantity: 0,
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

      .addCase(addProductFavorite.fulfilled, (state, action) => {
        const newFavorites = action.payload.products || [];
        state.favorites = newFavorites;
        state.favoritesQuantity = newFavorites.length;
      })

      .addCase(removeProductFavorite.fulfilled, (state, action) => {
        const removedProductId = action.meta.arg;
        state.favorites = action.payload.products;
        state.favorites = state.favorites.filter(
          (favorite) => favorite.product !== removedProductId
        );
        state.favoritesQuantity = state.favorites.length;
      })

      .addCase(getFavoriteProducts.fulfilled, (state, action) => {
        state.favoritesQuantity = state.favorites.length;
        if (!Array.isArray(action.payload)) {
          console.error("action.payload не є масивом");
          state.loading = false;
          return;
        }

        const allFavoriteProducts = action.payload.flatMap(
          (item) => item.products
        );

        state.favorites = allFavoriteProducts;
        state.loading = false;
      })

      .addMatcher(
        isAnyOf(
          getAllProduct.pending,
          getProductById.pending,
          getFavoriteProducts.pending,
          addProductFavorite.pending,
          removeProductFavorite.pending
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getAllProduct.rejected,
          getProductById.rejected,
          getFavoriteProducts.rejected,
          addProductFavorite.rejected,
          removeProductFavorite.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
          console.error("Error:", action.payload);
        }
      ),
});

export const productsReducer = productSlice.reducer;
