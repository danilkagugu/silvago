import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  requestGetCurrentUser,
  requestLogout,
  requestSignIn,
  requestSignUp,
  requestUpdate,
  setToken,
} from "../../services/authApi";

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
      return rejectWithValue(error.message);
    }
  }
);

export const apiLogoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await requestLogout();
      setToken(null);
      return;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const apiRefreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (token === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    setToken(token);
    try {
      const data = await requestGetCurrentUser();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const getUserInfo = createAsyncThunk(
  "user/info",
  async (_, thunkAPI) => {
    try {
      const response = await requestGetCurrentUser();
      console.log("response: ", response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const apiUpdateUser = createAsyncThunk(
  "user/update",
  async (body, thunkAPI) => {
    try {
      const response = await requestUpdate(body);
      return response.data.user;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
