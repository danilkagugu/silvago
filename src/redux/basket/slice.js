import { createSlice } from "@reduxjs/toolkit";
import {} from "./operations";

const INITIAL_STATE = {
  tottalPrice: 0,
  items: [],
};

const basketSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => builder.addCase(),
});

export const basketReducer = basketSlice.reducer;
