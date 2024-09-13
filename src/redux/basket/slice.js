import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addProduct,
  createOrder,
  deleteProduct,
  getBasketInfo,
  updateProductQuantityBasket,
} from "./operations";

const INITIAL_STATE = {
  order: null,
  items: [],
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
        state.items = action.payload.products;

        state.totalPrice = state.items.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
        state.loading = false;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items = action.payload;
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
        state.items = payload.products;
        state.allQuantity = state.items.reduce((total, item) => {
          return total + item.quantity;
        }, 0);
        state.totalPrice = state.items.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0);
        // const itemsToRemove = state.items.map((item) => ({
        //   product: item.product,
        //   volume: item.volume,
        // }));

        // state.items = state.items.filter(
        //   (item) =>
        //     !itemsToRemove.some(
        //       (toRemove) =>
        //         item.product === toRemove.product &&
        //         item.volume === toRemove.volume
        //     )
        // );

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
          deleteProduct.pending
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
          deleteProduct.rejected
        ),
        (state) => {
          state.loading = false;
          state.error = true;
        }
      ),
});

export const basketReducer = basketSlice.reducer;
