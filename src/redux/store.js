import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/slice";
import { basketReducer } from "./basket/slice";
import { productsReducer } from "./product/slice";
import { orderReducer } from "./order/slice";
import { searchReducer } from "./filterProduct/slice";
import { inventoryInfoReducer } from "./inventoryStore/slice";
import { deliveryReducer } from "./novaPoshta/slice";

const authConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};
const basketConfig = {
  key: "basket",
  storage,
};
// const productsConfig = {
//   key: "products",
//   storage,
// };
export const store = configureStore({
  reducer: {
    auth: persistReducer(authConfig, authReducer),
    basket: persistReducer(basketConfig, basketReducer),
    products: productsReducer,
    orders: orderReducer,
    search: searchReducer,
    inventory: inventoryInfoReducer,
    delivery: deliveryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
