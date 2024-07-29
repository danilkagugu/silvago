import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { addProduct, getBasketInfo } from "./operations";

const INITIAL_STATE = {
  items: [],
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
        state.items = action.payload;
        console.log("state.items: ", state.items);
        state.totalPrice = action.payload.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items = action.payload;
        state.totalPrice = action.payload.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        state.loading = false;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(getBasketInfo.pending, addProduct.pending),
        (state) => {
          state.loading = true;
          state.error = false;
        }
      )
      .addMatcher(
        isAnyOf(getBasketInfo.rejected, addProduct.rejected),
        (state) => {
          state.loading = false;
          state.error = true;
        }
      ),
});

export const basketReducer = basketSlice.reducer;
