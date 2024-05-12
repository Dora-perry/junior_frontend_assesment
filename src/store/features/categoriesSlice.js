import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    { id: 1, name: "1 Star", isDefault: true },
    { id: 2, name: "2 Star", isDefault: true },
    { id: 3, name: "3 Star", isDefault: true },
  ],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory(state, action) {
      if (!state.categories.includes(action.payload)) {
        state.categories.push({
          ...action.payload,
          id: state.categories.length + 1,
        });
      }
    },
    removeCategory(state, action) {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload.id
      );
    },
    updateCategory(state, action) {
      const index = state.categories.findIndex(
        (category) => category.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index] = {
          ...state.categories[index],
          ...action.payload,
        };
      }
    },
  },
});

export const { addCategory, removeCategory, updateCategory } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
