/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { configureStore } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import WishlistReducer from "./features/wishlist/wishlistSlice";
import currencyReducer from "./features/currency/currencySlice";
import { baseApi } from "./api/baseApi";

const APP_PERSIST_VERSION = 3;

const createNoopStorage = () => {
  return {
    getItem(_key: string): Promise<null> {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any): Promise<any> {
      return Promise.resolve(value);
    },
    removeItem(_key: string): Promise<void> {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

// 🧩 Migration logic — clears old persisted data when version mismatched
const migrate = async (state: any) => {
  try {
    if (state?._persist?.version !== APP_PERSIST_VERSION) {
      console.log("⚠️ Redux Persist: version mismatch, clearing old data");
      return {}; // return empty to reset persisted state
    }
    return state;
  } catch (err) {
    console.error("Migration error:", err);
    return {};
  }
};

const persistAuthConfig = {
  key: "auth",
  storage,
  version: APP_PERSIST_VERSION,
  migrate,
};

const persistCartConfig = {
  key: "cart",
  storage,
  version: APP_PERSIST_VERSION,
  migrate,
};

const persistWishlistConfig = {
  key: "wishlist",
  storage,
  version: APP_PERSIST_VERSION,
  migrate,
};

const persistCurrencyConfig = {
  key: "currency",
  storage,
  version: APP_PERSIST_VERSION,
  migrate,
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedCartReducer = persistReducer(persistCartConfig, cartReducer);
const persistedWishlistReducer = persistReducer(
  persistWishlistConfig,
  WishlistReducer
);
const persistedCurrencyReducer = persistReducer(
  persistCurrencyConfig,
  currencyReducer
);

export const makeStore = () => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      auth: persistedAuthReducer,
      cart: persistedCartReducer,
      wishlist: persistedWishlistReducer,
      currency: persistedCurrencyReducer,
    },
    middleware: (getDefaultMiddlewares) =>
      getDefaultMiddlewares({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(baseApi.middleware),
  });
};

export const store = makeStore();
export const persistor = persistStore(store);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
