import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addProduct,
  addToCart,
  createOrder,
  deleteProduct,
  fetchProductDetails,
  getBasketInfo,
  getCart,
  removeFromCart,
  updateProductQuantityBasket,
  updateQuantityInCart,
} from "./operations";

const INITIAL_STATE = {
  order: null,
  items: [],
  cartItems: [],
  productDetails: {},
  allQuantity: 0,
  totalPrice: 0,
  loading: false,
  error: null,
};

const basketSlice = createSlice({
  name: "basket",
  initialState: INITIAL_STATE,
  extraReducers: (builder) =>
    builder
      .addCase(getBasketInfo.fulfilled, (state, action) => {
        state.items = action.payload.products || [];

        state.totalPrice = state.items.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);

        state.loading = false;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        // Якщо приходить об'єкт, беремо його `items`, інакше залишаємо масив
        state.cartItems = action.payload;

        state.allQuantity = state.cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalPrice = state.cartItems.reduce(
          (total, item) =>
            total + item.selectedVariation.discountPrice * item.quantity,
          0
        );

        state.loading = false;
        state.error = null;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        // console.log("action.payload: ", action.payload);

        state.cartItems = action.payload;
        // console.log("state.cartItems: ", state.cartItems);

        state.allQuantity = state.cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalPrice = state.cartItems.reduce(
          (total, item) =>
            total + item.selectedVariation.discountPrice * item.quantity,
          0
        );

        state.loading = false;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        console.log("action.payload: ", action.payload);

        state.cartItems = action.payload;

        state.allQuantity = state.cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalPrice = state.cartItems.reduce(
          (total, item) =>
            total + item.selectedVariation.discountPrice * item.quantity,
          0
        );

        state.loading = false;
        state.error = null;
      })

      .addCase(updateQuantityInCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.allQuantity = state.cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalPrice = state.cartItems.reduce(
          (total, item) =>
            total + item.selectedVariation.discountPrice * item.quantity,
          0
        );
        state.loading = false;
        state.error = null;
      })

      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        const { slug, details } = action.payload;

        // console.log("action.payload: ", action.payload);
        state.productDetails[slug] = details;
        state.loading = false;
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.items = action.payload.products;

        state.allQuantity = action.payload.products.reduce((total, item) => {
          return total + item.quantity;
        }, 0);
        state.totalPrice = action.payload.products.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        // console.log("payload: ", payload);
        state.items = payload.products;
        state.allQuantity = state.items.reduce((total, item) => {
          return total + item.quantity;
        }, 0);
        state.totalPrice = state.items.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);

        state.loading = false;
        state.error = null;
      })

      .addCase(createOrder.fulfilled, (state /*action*/) => {
        state.items = [];
        state.totalPrice = 0;
        state.allQuantity = 0;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProductQuantityBasket.fulfilled, (state, { payload }) => {
        state.items = payload.products;
        state.allQuantity = state.items.reduce((total, item) => {
          return total + item.quantity;
        }, 0);
        state.totalPrice = state.items.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
        state.loading = false;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(
          getBasketInfo.pending,
          addProduct.pending,
          createOrder.pending,
          deleteProduct.pending,
          updateProductQuantityBasket.pending,
          fetchProductDetails.pending,
          addToCart.pending,
          removeFromCart.pending,
          updateQuantityInCart.pending,
          getCart.pending
        ),
        (state) => {
          state.loading = true;
          state.error = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getBasketInfo.rejected,
          addProduct.rejected,
          createOrder.rejected,
          deleteProduct.rejected,
          updateProductQuantityBasket.rejected,
          fetchProductDetails.rejected,
          addToCart.rejected,
          removeFromCart.rejected,
          updateQuantityInCart.rejected,
          getCart.rejected
        ),
        (state) => {
          state.loading = false;
          state.error = true;
        }
      ),
});

export const basketReducer = basketSlice.reducer;
