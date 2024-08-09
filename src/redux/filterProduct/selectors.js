import { createSlice } from "@reduxjs/toolkit";
const filterSlice = createSlice({
  name: "filter", // Ім'я слайсу
  initialState: { name: "" }, //Початковий стан редюсера слайсу
  reducers: {
    changeFilterName(state, action) {
      state.name = action.payload;
    },
  },
});

// екшени
export const { changeFilterName } = filterSlice.actions;

// Редюсер слайсу
export const filterReducer = filterSlice.reducer;
