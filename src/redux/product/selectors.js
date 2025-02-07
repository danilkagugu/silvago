export const selectProducts = (state) => state.products.product;
export const selectProductVariation = (state) =>
  state.products.productByVariation;
export const selectProductsTorgsoft = (state) => state.products.productTorgsoft;
export const selectProductDetails = (state) => state.products.productDetails;
export const selectFavoritesProducts = (state) =>
  state.products.favorites || [];
export const selectFavoritesQuantity = (state) =>
  state.products.favoritesQuantity;
export const selectTopProducts = (state) => state.products.topProducts;
export const selectDiscountProducts = (state) =>
  state.products.discountProducts;
export const selectDefaultVariations = (state) =>
  state.products.defaultProductVariations;
export const selectProductLoading = (state) => state.products.loading;
export const selectProductsFilter = (state) => state.products.items;
export const selectProductsMinPrice = (state) => state.products.items.minPrice;
export const selectProductsMaxPrice = (state) => state.products.items.maxPrice;
export const selectBrandsCount = (state) => state.products.brandsCount;
export const selectCategoriesCount = (state) => state.products.categoriesCount;
 