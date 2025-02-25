import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addProductFavorite,
  fetchDiscountProducts,
  fetchFilteredProducts,
  fetchProductVariation,
  fetchTopProducts,
  getAllProduct,
  getAllProductTorgsoft,
  getFavoriteProducts,
  getProductById,
  getProductVariations,
  removeProductFavorite,
  fetchPriceRenge,
  getCountProductByFilters,
  toogleFavorite,
  clearFavorites,
} from "./operations";

const INITIAL_STATE = {
  product: [],
  productByVariation: null,
  defaultProductVariations: {},
  items: [],
  productTorgsoft: [],
  topProducts: [],
  discountProducts: [],
  favorites: [],
  favoritesQuantity: 0,
  productDetails: null,
  loading: false,
  error: null,
  skinNeedsFilter: [], // Додаємо цей стейт для відстеження активних фільтрів
  minPrice: null,
  maxPrice: null,
  brandsCount: [],
  categoriesCount: [],
};

const productSlice = createSlice({
  name: "products",
  initialState: INITIAL_STATE,

  extraReducers: (builder) =>
    builder
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.product = action.payload;

        // console.log("action.payload: ", action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchPriceRenge.fulfilled, (state, action) => {
        state.minPrice = action.payload.minPrice;
        state.maxPrice = action.payload.maxPrice;

        state.loading = false;
        state.error = null;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.items = action.payload;

        state.loading = false;
        state.error = null;
      })

      .addCase(getAllProductTorgsoft.fulfilled, (state, action) => {
        state.productTorgsoft = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getProductVariations.fulfilled, (state, action) => {
        state.defaultProductVariations = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProductVariation.fulfilled, (state, action) => {
        const productId = Object.keys(action.payload)[0];
        const variation = action.payload[productId];
        state.defaultProductVariations[productId] = variation;

        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        state.topProducts = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDiscountProducts.fulfilled, (state, action) => {
        state.discountProducts = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        // console.log("action.payload", action.payload);
        state.productDetails = action.payload;
        state.loading = false;
      })

      .addCase(addProductFavorite.fulfilled, (state, action) => {
        const newFavorites = action.payload.products || [];
        state.favorites = newFavorites;
        state.favoritesQuantity = newFavorites.length;
      })
      .addCase(toogleFavorite.fulfilled, (state, action) => {
        // const { productId, idTorgsoft } = action.meta.arg;
        // console.log("idTorgsoft: ", idTorgsoft);
        // console.log("productId: ", productId);
        // console.log("action.payload: ", action.payload);

        // // Фільтруємо лише конкретну варіацію, а не весь товар
        // state.favorites = state.favorites.filter(
        //   (fav) =>
        //     !(fav.productId === productId && fav.idTorgsoft === idTorgsoft)
        // );
        // state.favorites = action.payload;
        // state.favoritesQuantity = state.favorites.length;
        console.log("Updated favorites from backend:", action.payload);

        state.favorites = action.payload.favorites; // Оновлюємо стан реальними даними
        state.favoritesQuantity = state.favorites.length;
      })
      .addCase(clearFavorites.fulfilled, (state) => {
        state.favorites = [];
        state.favoritesQuantity = 0;
      })

      .addCase(removeProductFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload.products || [];
        state.favoritesQuantity = state.favorites.length;
      })

      .addCase(getFavoriteProducts.fulfilled, (state, action) => {
        // if (!Array.isArray(action.payload)) {
        //   console.error("action.payload не є масивом");
        //   state.loading = false;
        //   return;
        // }
        // console.log("ДО state.favorites: ", state.favorites);
        state.favorites = action.payload;
        // console.log("ПІСЛЯ state.favorites: ", state.favorites);
        state.favoritesQuantity = state.favorites.length;
        state.loading = false;
      })
      .addCase(getCountProductByFilters.fulfilled, (state, action) => {
        state.brandsCount = action.payload.brandsCount;
        state.categoriesCount = action.payload.categoriesCount;
        state.loading = false;
      })

      .addMatcher(
        isAnyOf(
          getAllProduct.pending,
          fetchPriceRenge.pending,
          fetchFilteredProducts.pending,
          fetchProductVariation.pending,
          getProductVariations.pending,
          getAllProductTorgsoft.pending,
          getProductById.pending,
          getFavoriteProducts.pending,
          addProductFavorite.pending,
          removeProductFavorite.pending,
          fetchTopProducts.pending,
          fetchDiscountProducts.pending,
          getCountProductByFilters.pending
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getAllProduct.rejected,
          fetchPriceRenge.rejected,
          fetchFilteredProducts.rejected,
          fetchProductVariation.rejected,
          getAllProductTorgsoft.rejected,
          getProductVariations.rejected,
          getProductById.rejected,
          getFavoriteProducts.rejected,
          addProductFavorite.rejected,
          removeProductFavorite.rejected,
          fetchTopProducts.rejected,
          fetchDiscountProducts.rejected,
          getCountProductByFilters.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
          console.error("Error:", action.payload);
        }
      ),
});

export const productsReducer = productSlice.reducer;
