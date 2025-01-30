import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCities,
  getCurrentPostOffice,
  getInfoCity,
  getPostOffice,
} from "../../services/NovaPoshtaApi";

export const fetchCities = createAsyncThunk(
  "delivery/getCitys",
  async (_, thunkApi) => {
    try {
      const data = await getAllCities();
      // console.log("data: ", data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const infoCurrentCity = createAsyncThunk(
  "delivery/getCity",
  async (selectedCity, thunkApi) => {
    try {
      const data = await getInfoCity(selectedCity);
      // console.log("data: ", data);
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchOffices = createAsyncThunk(
  "delivery/getOffices",
  async (cityRef, thunkApi) => {
    try {
      const data = await getPostOffice(cityRef);
      // console.log("data: ", data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const fetchCurrentOffice = createAsyncThunk(
  "delivery/getOffice",
  async ({ cityName, warehouseId }, thunkApi) => {
    try {
      const data = await getCurrentPostOffice(cityName, warehouseId);
      // console.log("data: ", data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
