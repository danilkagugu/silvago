import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { apiRegisterUser } from "./operations";

const INITIAL_STATE = {
  userData: null,
  token: null,
  isLoggedIn: false,
  isRefresh: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  extraReducers: (builder) =>
    builder
      .addCase(apiRegisterUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addMatcher(isAnyOf(apiRegisterUser.pending), (state) => {
        state.loading = true;
        state.error = false;
      })
      .addMatcher(isAnyOf(apiRegisterUser.rejected), (state) => {
        state.loading = false;
        state.error = true;
      }),
});

export const authReducer = authSlice.reducer;
