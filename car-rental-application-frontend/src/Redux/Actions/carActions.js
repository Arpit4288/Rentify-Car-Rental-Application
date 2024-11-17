import axios from "axios";
import { serverURL } from "../store";

// 'Authorization': 'Bearer ${}'
const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
        return {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
        };
    } else {
        return {
            'Content-Type': 'application/json',
        };
    }
};


export const getAllCars = () => async (dispatch) => {
    try {
        dispatch({ type: 'getAllCarsRequest' });
        const { data } = await axios.get(`${serverURL}/car`, {
            headers: getAuthHeader(),
        });

        if (data) {
            dispatch({ type: 'carsFetchSuccess', payload: data });
        } else {
            dispatch({ type: 'carsFetchFailed', payload: "Error in Loading Car data" });
        }
    } catch (error) {
        dispatch({ type: 'carsFetchFailed', payload: "Error in Loading Car data" });
    }
};


export const getCarById = (carId) => async (dispatch) => {
    try {
        dispatch({ type: 'getCarByIdRequest' });
        const { data } = await axios.get(`${serverURL}/car/${carId}`, {
            headers: getAuthHeader(),
        });

        if (data) {
            dispatch({ type: 'getCarByIdSuccess', payload: data });
        } else {
            dispatch({ type: 'getCarByIdFailed', payload: "Error in fetching Car by ID" });
        }
    } catch (error) {
        dispatch({ type: 'getCarByIdFailed', payload: "Error in fetching Car by ID" });
    }
};



export const addCar = (carData) => async (dispatch) => {
    try {
        dispatch({ type: 'addCarRequest' });
        const { data } = await axios.post(`${serverURL}/car`, carData, {
            headers: getAuthHeader(),
        });

        if (data) {
            dispatch({ type: 'addCarSuccess', payload: data });
        } else {
            dispatch({ type: 'addCarFailed', payload: "Error in adding Car" });
        }
    } catch (error) {
        dispatch({ type: 'addCarFailed', payload: "Error in adding Car" });
    }
};


export const updateCar = (carId, updatedCarData) => async (dispatch) => {
    try {
        dispatch({ type: 'updateCarRequest' });
        const { data } = await axios.put(`${serverURL}/car/${carId}`, updatedCarData, {
            headers: getAuthHeader(),
        });

        if (data) {
            dispatch({ type: 'updateCarSuccess', payload: data });
        } else {
            dispatch({ type: 'updateCarFailed', payload: "Error in updating Car" });
        }
    } catch (error) {
        dispatch({ type: 'updateCarFailed', payload: "Error in updating Car" });
    }
};

export const deleteCar = (carId) => async (dispatch) => {
    try {
        dispatch({ type: 'deleteCarRequest' });
        const { data } = await axios.delete(`${serverURL}/car/${carId}`, {
            headers: getAuthHeader(),
        });
        
        dispatch({ type: 'deleteCarSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'deleteCarFailed', payload: "Error in deleting Car" });
    }
};