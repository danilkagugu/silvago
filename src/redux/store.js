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

const authConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};
const basketConfig = {
  key: "basket",
  storage,
};
export const store = configureStore({
  reducer: {
    auth: persistReducer(authConfig, authReducer),
    basket: persistReducer(basketConfig, basketReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
