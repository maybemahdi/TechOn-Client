import { RootState } from "@/redux/store";
import { Product } from "@/types/product";
import { createSlice } from "@reduxjs/toolkit";

export interface CartProduct extends Omit<Product, "createdAt" | "updatedAt"> {
  orderQuantity: number;
  color: string;
  storage: string;
  price: number;
}

interface InitialState {
  products: CartProduct[];
}

const initialState: InitialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const productToAdd = state.products.find(
        (product: CartProduct) => product.id === action.payload.id
      );

      if (productToAdd) {
        productToAdd.orderQuantity += 1;
        return;
      }

      state.products.push({
        ...action.payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    },
    incrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find(
        (product: CartProduct) => product.id === action.payload
      );

      if (productToIncrement) {
        productToIncrement.orderQuantity += 1;
        return;
      }
    },
    decrementOrderQuantity: (state, action) => {
      const productToIncrement = state.products.find(
        (product: CartProduct) => product.id === action.payload
      );

      if (productToIncrement && productToIncrement.orderQuantity > 1) {
        productToIncrement.orderQuantity -= 1;
        return;
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product: CartProduct) => product.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
});

//* Products

export const orderedProductsSelector = (state: RootState) => {
  return state.cart.products;
};

export const cartProductsQuantitySelector = (state: RootState) => {
  return state.cart.products.length;
};

export const orderSelector = (state: RootState) => {
  return {
    products: state.cart.products.map((product: CartProduct) => ({
      id: product.id,
      quantity: product.orderQuantity,
    })),
  };
};

//* Payment

export const subTotalSelector = (state: RootState) => {
  return state.cart.products.reduce((acc: number, product: CartProduct) => {
    // Check for discounted price or regular price
    const price = Number(product.price);
    // Add the total for this product to the accumulator
    return acc + price * product.orderQuantity;
  }, 0);
};

export const {
  addProduct,
  incrementOrderQuantity,
  decrementOrderQuantity,
  removeProduct,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
