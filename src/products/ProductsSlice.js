import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* -------------SINCE THIS IS NOT A LARGE-SCALE APP I WILL USE CART INSIDE PRODUCTSSLICE---------------- */

// this function gets the products
export const getProducts = createAsyncThunk(
    "products/getProducts",
    async (_ ,{rejectWithValue}) => {
        try {
            const response = await axios.get("https://6249a1e8fd7e30c51c042ccb.mockapi.io/api/packages");
            console.log("getting products", response.data);
            if (response.status === 200) {
                return response.data;
            }
            else {
                return rejectWithValue(response);
              }
        } catch(err) {
            return rejectWithValue(err);
        }
});

// this function makes a payment request
export const makePayment = createAsyncThunk(
    "products/makePayment",
    async (arg, {rejectWithValue}) => {
        console.log("args", arg);
        try {
            const response = await axios.post("https://6249a1e8fd7e30c51c042ccb.mockapi.io/api/payment", arg);
            console.log("making payment", response.data);
            if (response.status === 200) {
                return response.data;
            }
            else {
                return rejectWithValue(response);
              }
        }
        catch(err) {
            return rejectWithValue(err);
        }
});

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        isPending: false,
        error: false,
        errorMessage: "",
        cart: [],
        totalAmount: 0,
        paymentBool:true,
    },
    reducers: {
        addToCart: (state, action) => {
            const item = state.cart.some(item => item.id === action.payload.id);
            if (item) {
                // double click removes the product from the cart;
                console.log("varmış")
                state.cart = state.cart.filter(item => item.id !== action.payload.id);
            }
            else {
                state.cart.push(action.payload);
            }
            state.totalAmount = state.cart.map(item => item.amount).reduce((prev,next) => prev + next);
        },
    },
    extraReducers: {
        [getProducts.fulfilled]: (state, action) => {
            state.products = action.payload;
        },
        [getProducts.rejected]: (state, action) => {
            state.errorMessage = action.payload;
        },
        [getProducts.pending]: (state) => {
            state.isPending = true;
        },
        [makePayment.fulfilled]: (state, action) => {
            state.cart = [];
            state.totalAmount = 0;
            state.paymentBool = true;
        },
        [makePayment.rejected]: (state, action) => {
            state.errorMessage = action.payload;
        },
        [makePayment.pending]: (state) => {
            state.isPending = true;
        },
    }
});
export default productsSlice.reducer;
export const { addToCart } = productsSlice.actions;
export const selectProducts = state => state.products;

