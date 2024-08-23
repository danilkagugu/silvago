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
        console.log("додав");
        const newFavorites = action.payload.products || [];
        state.favorites = newFavorites;
        state.favoritesQuantity = newFavorites.length;
      })

      .addCase(removeProductFavorite.fulfilled, (state, action) => {
        // console.log("удалив");
        // console.log("removedProductId: ", removedProductId);
        // console.log("state.favorites: ", state.favorites);
        const removedProductId = action.meta.arg;
        state.favorites = action.payload.products;
        // const productsToRemove = action.payload.products.map(
        //   (product) => product._id
        // );
        state.favorites = state.favorites.filter(
          (favorite) => favorite.product !== removedProductId
        );
        state.favoritesQuantity = state.favorites.length;
      })
      // .addCase(removeProductFavorite.fulfilled, (state, action) => {
      //   console.log("удалив");
      //   const removedProductId = action.meta.arg;
      //   console.log("removedProductId: ", removedProductId);
      //   state.favorites = action.payload.products;
      //   console.log("state.favorites: ", state.favorites);
      //   const productsToRemove = action.payload.products.map(
      //     (product) => product._id
      //   );
      //   state.favorites = state.favorites.filter(
      //     (favorite) => !productsToRemove.includes(favorite._id)
      //   );
      //   state.favoritesQuantity = state.favorites.length;
      // })

      .addCase(getFavoriteProducts.fulfilled, (state, action) => {
        // Перевірте, що action.payload є масивом
        if (!Array.isArray(action.payload)) {
          console.error("action.payload не є масивом");
          state.loading = false;
          return;
        }
        // console.log("action.payload", action.payload);
        // console.log("action.payload", typeof action.payload);

        // Об'єднуємо всі продукти з улюблених у один масив
        const allFavoriteProducts = action.payload.flatMap(
          (item) => item.products
        );
        // console.log("allFavoriteProducts: ", allFavoriteProducts);

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
