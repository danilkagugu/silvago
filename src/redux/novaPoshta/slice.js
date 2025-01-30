import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCities,
  fetchCurrentOffice,
  fetchOffices,
  infoCurrentCity,
} from "./operations";

const INITIAL_STATE = {
  cities: [],
  currentCity: [],
  currentOffice: [],
  offices: [],
  loading: {
    cities: false,
    offices: false,
    currentCity: false,
    currentOffice: false,
  },
  error: null,
};

const deliverySlice = createSlice({
  name: "delivery",
  initialState: INITIAL_STATE,
  extraReducers: (builder) =>
    builder
      // Операції для міст
      .addCase(fetchCities.pending, (state) => {
        state.loading.cities = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.cities = action.payload;
        state.loading.cities = false;
        state.error = null;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading.cities = false;
        state.error = action.payload;
      })
      // операції для вибраного міста
      .addCase(infoCurrentCity.pending, (state) => {
        state.loading.currentCity = true;
        state.error = null;
      })
      .addCase(infoCurrentCity.fulfilled, (state, action) => {
        state.currentCity = action.payload;
        state.loading.currentCity = false;
        state.error = null;
      })
      .addCase(infoCurrentCity.rejected, (state, action) => {
        state.loading.currentCity = false;
        state.error = action.payload;
      })
      // Операції для офісів
      .addCase(fetchOffices.pending, (state) => {
        state.loading.offices = true;
        state.error = null;
      })
      .addCase(fetchOffices.fulfilled, (state, action) => {
        state.offices = action.payload;
        state.loading.offices = false;
        state.error = null;
      })
      .addCase(fetchOffices.rejected, (state, action) => {
        state.loading.offices = false;
        state.error = action.payload;
      })
      // Операції для вибраного офіса
      .addCase(fetchCurrentOffice.pending, (state) => {
        state.loading.currentOffice = true;
        state.error = null;
      })
      .addCase(fetchCurrentOffice.fulfilled, (state, action) => {
        state.currentOffice = action.payload;
        state.loading.currentOffice = false;
        state.error = null;
      })
      .addCase(fetchCurrentOffice.rejected, (state, action) => {
        state.loading.currentOffice = false;
        state.error = action.payload;
      }),
});

export const deliveryReducer = deliverySlice.reducer;
