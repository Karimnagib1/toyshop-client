import {configureStore} from '@reduxjs/toolkit';
import productsReducer from "../features/Products/ProductsSlice";
import cartReducer from "../features/Cart/CartSlice";
import userReducer from "../features/Login/UserSlice";
const store = configureStore({
    reducer: {
        products: productsReducer,
        user: userReducer,
        cart: cartReducer
    }
});

export default store;