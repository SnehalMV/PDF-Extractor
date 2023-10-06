import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import userSlice from "./userSlice";


const rootReducer = combineReducers({
  user: userSlice,
})

const persistConfig = {
  key: 'social-media',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer
})

const persistor = persistStore(store)

export { persistor, store }