import { configureStore } from "@reduxjs/toolkit";
import authSlice  from "./auth/AuthSlice";
import productsSlice from "./products/ProductsSlice";
const store = configureStore ({
    reducer: {
        auth:authSlice,
        products:productsSlice
    }
})
export default store;