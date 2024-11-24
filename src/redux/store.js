/*import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducer from "./user/userSlice";

import { version } from "react";
/*const rootreducer = combineReducers({ user: reducer });

const persistConfig = {
  key : 'root',
  storage,
  version :1,

}
const persistedreducer = persistedReducer(persistConfig, rootreducer);*/

/*export const store = configureStore({
  reducer: { user: reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});*/

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // This defaults to localStorage for web
import userReducer from "./user/userSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
