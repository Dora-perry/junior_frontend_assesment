import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    { id: 1, name: "1 Star" },
    { id: 2, name: "2 Star" },
    { id: 3, name: "3 Star" },
  ],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory(state, action) {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
    removeCategory(state, action) {
      state.categories = state.categories.filter(
        (category) => category !== action.payload
      );
    },
    updateCategory(state, action) {
      const { oldCategory, newCategory } = action.payload;
      const index = state.categories.indexOf(oldCategory);
      if (index !== -1) {
        state.categories[index] = newCategory;
      }
    },
  },
});

export const { addCategory, removeCategory, updateCategory } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
