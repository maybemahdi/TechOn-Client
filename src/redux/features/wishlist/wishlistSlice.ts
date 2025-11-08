import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/product"; // adjust path

type WishlistState = {
  items: Product[];
};

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find((item: Product) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item: Product) => item.id !== action.payload
      );
    },
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find(
        (item: Product) => item.id === action.payload.id
      );
      if (exists) {
        state.items = state.items.filter(
          (item: Product) => item.id !== action.payload.id
        );
      } else {
        state.items.push(action.payload);
      }
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const wishlistSelector = (state: { wishlist: WishlistState }) =>
  state.wishlist.items;

export const wishlistProductsCountSelector = (state: { wishlist: WishlistState }) =>
  state.wishlist.items.length;

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
