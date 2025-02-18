export const selectBasket = (state) => state.basket.items || [];
export const selectItemsCart = (state) => state.basket.cartItems;
export const selectTotalPrice = (state) => state.basket.totalPrice;
export const selectAllQuantity = (state) => state.basket.allQuantity;
export const selectLoading = (state) => state.basket.loading;
export const selectProductDetails = (state) => state.basket.productDetails;
