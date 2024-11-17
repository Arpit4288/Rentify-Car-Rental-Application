import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducers/userReducer";
import { carReducer } from "./Reducers/carReducer";
import { agreementReducer } from "./Reducers/agreementReducer";


const store = configureStore({
    reducer : {
        user : userReducer,
        car: carReducer,
        agreement: agreementReducer,
    },
});

export default store;

export const serverURL = "https://localhost:7094/api/v1"