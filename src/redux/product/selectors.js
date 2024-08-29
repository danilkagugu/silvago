export const selectProducts = (state) => state.products.product;
export const selectProductDetails = (state) => state.products.productDetails;
export const selectFavoritesProducts = (state) =>
  state.products.favorites || [];
export const selectFavoritesQuantity = (state) =>
  state.products.favoritesQuantity;
