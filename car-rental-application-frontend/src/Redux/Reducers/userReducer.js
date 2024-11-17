import { createReducer } from "@reduxjs/toolkit";
let data = localStorage.getItem('user');
// const data = JSON.parse(localStorage.getItem('user'));
const initialState = {
    user: data ? JSON.parse(data) : [],
    isAuthenticated: data ? true : false,
    userLoading: false,
    userError: null,
    userMessage: null,
};
export const userReducer = createReducer(initialState, {
    loginRequest: (state) => {
        state.userLoading = true;
    },
    loginSuccess: (state, action) => {
        state.userLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.userMessage = "Success";
        state.userError = null;
    },
    loginFail: (state, action) => {
        state.userLoading = false;
        state.isAuthenticated = false;
        state.userMessage = "Failed";
    },

    clearError: (state) => {
        state.userError = null;
    },
    clearMessage: (state) => {
        state.userMessage = null;
    },
    logoutUser: (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.userLoading = false;
        state.userError = null;
        state.userMessage = null;
        localStorage.removeItem("user");
    }
})