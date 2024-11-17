import { serverURL } from "../store";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: 'loginRequest' });
        const { data } = await axios.post(`${serverURL}/account/login`, { email, password }, {
            headers: {
                'Content-Type': "application/json",
            },
        });

        if (data) {
            localStorage.setItem("user", JSON.stringify(data));
            dispatch({ type: 'loginSuccess', payload: data });
        }
        else{
            dispatch({ type: 'loginFail', payload: "Login failed"});
        }


    } catch (error) {
        dispatch({ type: 'loginFail', payload: "Error in Login user" });
    }
}