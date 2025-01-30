import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBrands,
  getBrandsTorgsoft,
  getCategories,
  getCategoriesTorgsoft,
  getFilters,
  getSkins,
} from "../../services/api";

export const fetchAllSkins = createAsyncThunk(
  "inventory/skins",
  async (_, thunkAPI) => {
    try {
      const data = await getSkins();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchAllFilters = createAsyncThunk(
  "inventory/filters",
  async (_, thunkAPI) => {
    try {
      const data = await getFilters();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllCategories = createAsyncThunk(
  "inventory/categories",
  async (_, thunkAPI) => {
    try {
      const data = await getCategories();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchAllCategoriesTorgsoft = createAsyncThunk(
  "inventory/categoriesTorgsoft",
  async (_, thunkAPI) => {
    try {
      const data = await getCategoriesTorgsoft();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllBrands = createAsyncThunk(
  "inventory/brands",
  async (_, thunkAPI) => {
    try {
      const data = await getBrands();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchAllBrandsTorgsoft = createAsyncThunk(
  "inventory/brandsTorgsoft",
  async (_, thunkAPI) => {
    try {
      const data = await getBrandsTorgsoft();
      // console.log("data: ", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
