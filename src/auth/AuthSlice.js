import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const login = createAsyncThunk(
    "auth/login",
    async (arg, {rejectWithValue}) => {
        try {
            const response = await axios.post("http://localhost:80/auth/login", arg);
            if (response.status === 200) {
                return response.data;
            }
            else {
                return rejectWithValue(response);
              }
        } catch(err) {
            return rejectWithValue(err);
        }})
const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn:false,
        user: {
            fullName: "{name, surname}",
            email: "",
        },
        error: false,
        isPending:false,
        errorMessage: "",
    },
    reducers: {
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        [login.rejected]: (state, action) => {
            state.errorMessage = action.payload;
        },
        [login.pending]: (state) => {
            state.isPending = null;
        },
    }
});
export default authSlice.reducer;
export const selectAuth = state => state.auth;
