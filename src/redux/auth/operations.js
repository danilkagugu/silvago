import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestSignIn, requestSignUp } from "../../services/authApi";

export const apiRegisterUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await requestSignUp(formData);
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
export const apiLoginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await requestSignIn(formData);
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
