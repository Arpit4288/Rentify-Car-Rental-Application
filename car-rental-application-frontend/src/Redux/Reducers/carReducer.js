import { createReducer } from "@reduxjs/toolkit";
const initialState = {
    // all cars getting vars
    cars: [],
    carsLoading: false,
    carsMessage: null,
    carsError: null,

    // car gettings vars
    car: null,
    carLoading: false,
    carMessage : null,
    carError : null,

    // car adding vars
    addedCar: null,
    addedCarLoading : false,
    addedCarMessage: null,
    addedCarError : null,
    
    // car updating vars
    updatedCar: null,
    updatedCarLoading : false,
    updatedCarMessage: null,
    updatedCarError : null,
    
    
    // delete car vars
    deletedCar: null,
    deletedCarLoading : false,
    deletedCarMessage: null,
    deletedCarError : null,
    

    
    

};
export const carReducer = createReducer(initialState, {

    // get all car request

    getAllCarsRequest: (state, action) => {
        state.carsLoading = true;
    },
    carsFetchSuccess: (state, action) => {
        state.carsLoading = false;
        state.cars = action.payload.reverse();
        state.carsMessage = "Success";
        state.carsError = null;
    },
    carsFetchFailed: (state, action) => {
        state.carsLoading = false;
        state.cars = null;
        state.carsMessage = "Failed";
    },
    clearCarsError: (state) => {
        state.carsError = null;
        state.carsMessage = null;
    },
    clearCarsMessage: (state) => {
        state.carsMessage = null;
        state.carsError = null;
    },

    
    // get car request
    
    
    getCarByIdRequest: (state, action) => {
        state.carLoading = true;
    },

    getCarByIdSuccess: (state, action) => {
        state.carLoading = false;
        state.car = action.payload;
        state.carMessage = "Success";
        state.carError = null;
    },

    getCarByIdFailed: (state, action) => {
        state.carLoading = false;
        state.car = null;
        state.carMessage = "Failed";
    },

    clearCarError: (state) => {
        state.carError = null;
    },
    clearCarMessage: (state) => {
        state.carMessage = null;
    },
    
    // add new car request

    addCarRequest: (state, action) => {
        state.addedCarLoading = true;
    },
    addCarSuccess: (state, action) => {
        state.addedCarLoading = false;
        state.addedCar = action.payload;
        state.addedCarMessage = "Success";
        state.addedCarError = null;
    },

    addCarFailed: (state, action) => {
        state.addCarFailed = false;
        state.addedCar = null;
        state.addedCarMessage = "Failed";
    },
    clearAddedCarError: (state) => {
        state.addedCarError = null;
    },
    clearAddedCarMessage: (state) => {
        state.addedCarMessage = null;
    },

    // update car request

    updateCarRequest: (state, action) => {
        state.updatedCarLoading = true;
    },
    updateCarSuccess: (state, action) => {
        state.updatedCarLoading = false;
        state.updatedCar = action.payload;
        state.updatedCarMessage = "Success";
        state.updatedCarError = null;
    },
    updateCarFailed: (state, action) => {
        state.updatedCarLoading = false;
        state.updatedCar = null;
        state.updatedCarMessage = "Failed";
    },
    clearUpdatedCarError: (state) => {
        state.updatedCarError = null;
    },
    clearUpdatedCarMessage: (state) => {
        state.updatedCarMessage = null;
    },
    
    // delete car request 

    deleteCarRequest: (state, action) => {
        state.deletedCarLoading = true;
    },
    deleteCarSuccess: (state, action) => {
        state.deletedCarLoading = false;
        state.deletedCar = action.payload;
        state.deletedCarMessage = "Success";
        state.deletedCarError = null;
    },
    deleteCarFailed: (state, action) => {
        state.deletedCarLoading = false;
        state.deletedCarMessage = "Failed";
    },
    clearDeletedCarError: (state) => {
        state.deletedCarError = null;
    },
    clearDeletedCarMessage: (state) => {
        state.deletedCarMessage = null;
    },
})