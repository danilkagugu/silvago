import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrder, getOrderById } from "../../services/productApi";

export const getAllOrders = createAsyncThunk(
  "order/info",
  async (_, thunkAPI) => {
    try {
      const data = await getOrder();
      // console.log("data: ", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  "order/getById",
  async (id, thunkAPI) => {
    try {
      const data = await getOrderById(id);
      // console.log("data: ", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
