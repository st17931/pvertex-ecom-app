import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import filterReducer from './filterSlice';

const store = configureStore({
  reducer: {
    authSlice: authReducer,
    cartSlice: cartReducer,
    filterSlice: filterReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
