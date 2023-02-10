import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import cartSlice from "../feature/cart/cartSlice";
import filterSlice from "../feature/filter/filterSlice";
import productSlice from "../feature/products/productSlice";


const store = configureStore({
    reducer: {
        cart: cartSlice,
        filter: filterSlice,
        products: productSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export default store