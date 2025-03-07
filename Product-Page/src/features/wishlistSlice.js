import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const existingItem = state.wishlist.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.wishlist.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementWishlist: (state, action) => {
      const item = state.wishlist.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementWishlist: (state, action) => {
      const item = state.wishlist.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  addToWishList,
  incrementWishlist,
  decrementWishlist,
  removeFromWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
