import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      state.wishlist.push(action.payload);
    },
  },
});

export const { addToWishList } = wishlistSlice.actions;

export default wishlistSlice.reducer;
