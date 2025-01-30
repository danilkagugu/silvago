import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchOrderById, getAllOrders } from "./operations";

const INITIAL_STATE = {
  orders: [],
  order: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState: INITIAL_STATE,
  extraReducers: (builder) =>
    builder
      .addCase(getAllOrders.fulfilled, (state, action) => {
        // console.log("action: ", action);
        state.orders = action.payload;
        // console.log("action.payload: ", action.payload);
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        // console.log("action", action);
        state.order = action.payload;
        // console.log("state.order: ", state.order);
        state.loading = false;
        state.error = false;
      })

      .addMatcher(
        isAnyOf(getAllOrders.pending, fetchOrderById.pending),
        (state) => {
          state.loading = true;
          state.error = false;
        }
      )
      .addMatcher(
        isAnyOf(getAllOrders.rejected, fetchOrderById.rejected),
        (state) => {
          state.loading = false;
          state.error = true;
        }
      ),
});

export const orderReducer = orderSlice.reducer;
