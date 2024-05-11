import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotels: [],
};

const hotelsSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    addHotel(state, action) {
      state.hotels.push({
        ...action.payload,
        id: state.hotels.length + 1,
      });
    },
    editHotel(state, action) {
      const index = state.hotels.findIndex(
        (hotel) => hotel.id === action.payload.id
      );
      if (index !== -1) {
        state.hotels[index] = {
          ...state.hotels[index],
          ...action.payload,
        };
      } else {
        console.error("Hotel not found!");
      }
    },
    deleteHotel(state, action) {
      state.hotels = state.hotels.filter(
        (hotel) => hotel.id !== action.payload
      );
    },
  },
});

export const { addHotel, editHotel, deleteHotel } = hotelsSlice.actions;
export default hotelsSlice.reducer;
