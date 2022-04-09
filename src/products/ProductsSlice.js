import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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
    }
);
const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        isPending: false,
        error: false,
        errorMessage: "",
        cart: [],
    },
    reducers: {
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
        }
    }
});
export default productsSlice.reducer;
export const selectProducts = state => state.products;

