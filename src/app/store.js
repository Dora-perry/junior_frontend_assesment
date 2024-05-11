import { configureStore } from "@reduxjs/toolkit";
import hotelsReducer from "../features/hotelsSlice";
import categoriesReducer from "../features/categoriesSlice";

const loadState = () => {
  try {
    const persistedHotelData = localStorage.getItem("hotelsData");
    if (persistedHotelData === null) {
      return { hotels: [] };
    }
    return JSON.parse(persistedHotelData);
  } catch (err) {
    return { hotels: [] };
  }
};

const preloadedState = {
  hotels: loadState() || {},
};

const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
    categories: categoriesReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  try {
    const persistedHotelsData = JSON.stringify(store.getState().hotels);
    localStorage.setItem("hotelsData", persistedHotelsData);
  } catch (err) {
    console.error("Error writing to local storage:", err);
  }
});

export { store };
