import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
