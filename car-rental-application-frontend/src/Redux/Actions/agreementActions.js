import axios from "axios";
import { serverURL } from "../store";

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


// Action Creators

export const getAllAgreements = () => async (dispatch) => {
    try {
        dispatch({ type: 'getAllAgreementsRequest'});
        const { data } = await axios.get(`${serverURL}/rentalagreement`, {
            headers: getAuthHeader(),
        });
        
        if (data) {
            dispatch({ type: 'agreementsFetchSuccess', payload: data });
        } else {
            dispatch({ type: 'agreementsFetchFailed', payload: "Error in Loading Agreements data" });
        }
    } catch (error) {
        dispatch({ type: 'agreementsFetchFailed', payload: "Error in Loading Agreements data" });
    }
}

export const getAllAgreementsByUserId = (userId) => async (dispatch) => {
    try {
        dispatch({ type: 'getAllAgreementsRequest'});
        const { data } = await axios.get(`${serverURL}/rentalagreement/userId/${userId}`, {
            headers: getAuthHeader(),
        });
        
        if (data) {
            dispatch({ type: 'agreementsFetchSuccess', payload: data });
        } else {
            dispatch({ type: 'agreementsFetchFailed', payload: "Error in Loading Agreements data" });
        }
    } catch (error) {
        dispatch({ type: 'agreementsFetchFailed', payload: "Error in Loading Agreements data" });
    }
}

export const getAgreementsById = (agreementId) => async (dispatch) => {
    try {
        dispatch({ type: 'getAgreementByIdRequest'});
        const { data } = await axios.get(`${serverURL}/rentalagreement/agreementId/${agreementId}`, {
            headers: getAuthHeader(),
        });
        
        if (data) {
            dispatch({ type: 'getAgreementByIdSuccess', payload: data });
        } else {
            dispatch({ type: 'getAgreementByIdFailed', payload: "Error in Loading Agreement data" });
        }
    } catch (error) {
        dispatch({ type: 'getAgreementByIdFailed', payload: "Error in Loading Agreement data" });
    }
}

export const createAgreement = (agreementData) => async (dispatch) => {
    try {
        dispatch({ type: 'createAgreementRequest' });
        const { data } = await axios.post(`${serverURL}/rentalagreement`, agreementData, {
            headers: getAuthHeader(),
        });

        if (data) {
            dispatch({ type: 'createAgreementSuccess', payload: data });
        } else {
            dispatch({ type: 'createAgreementFailed', payload: "Error in creating agreement" });
        }
    } catch (error) {
        dispatch({ type: 'createAgreementFailed', payload: "Error in creating agreement" });
    }
};





export const updateAgreement = (agreementId, updatedAgreementData) => async (dispatch) => {
    try {
        dispatch({ type: 'updateAgreementRequest' });
        const { data } = await axios.put(`${serverURL}/rentalagreement/${agreementId}`, updatedAgreementData, {
            headers: getAuthHeader(),
        });

        if (data) {
            dispatch({ type: 'updateAgreementSuccess', payload: data });
        } else {
            dispatch({ type: 'updateAgreementFailed', payload: "Error in updating agreement" });
        }
    } catch (error) {
        dispatch({ type: 'updateAgreementFailed', payload: "Error in updating agreement" });
    }
};



export const deleteAgreement = (agreementId) => async (dispatch) => {
    try {
        dispatch({ type: 'deleteAgreementRequest' });
        await axios.delete(`${serverURL}/rentalagreement/${agreementId}`, {
            headers: getAuthHeader(),
        });

        dispatch({ type: 'deleteAgreementSuccess' });
    } catch (error) {
        dispatch({ type: 'deleteAgreementFailed', payload: "Error in deleting agreement" });
    }
};


export const acceptAgreement = (agreementId) => async (dispatch) => {
    try {
        dispatch({ type: 'acceptAgreementRequest' });
        await axios.put(`${serverURL}/rentalagreement/accept/${agreementId}`, null, {
            headers: getAuthHeader(),
        });

        dispatch({ type: 'acceptAgreementSuccess' });
    } catch (error) {
        dispatch({ type: 'acceptAgreementFailure', payload: "Error in accepting agreement" });
    }
};

export const approveAgreement = (agreementId) => async (dispatch) => {
    try {
        dispatch({ type: 'approveAgreementRequest' });
        await axios.put(`${serverURL}/rentalagreement/${agreementId}/approveAgreement`, null, {
            headers: getAuthHeader(),
        });

        dispatch({ type: 'approveAgreementSuccess' });
    } catch (error) {
        dispatch({ type: 'approveAgreementFailure', payload: "Error in approving agreement" });
    }
};

export const requestReturn = (agreementId) => async (dispatch) => {
    try {
        
        dispatch({ type: 'requestReturnRequest' });
        await axios.put(`${serverURL}/rentalagreement/${agreementId}/returnRequest`, null, {
            headers: getAuthHeader(),
        });

        dispatch({ type: 'requestReturnSuccess' });
    } catch (error) {
        dispatch({ type: 'requestReturnFailure', payload: "Error in requesting return" });
    }
};

export const approveReturn = (agreementId) => async (dispatch) => {
    try {
        dispatch({ type: 'approveReturnRequest' });
        await axios.put(`${serverURL}/rentalagreement/${agreementId}/approveReturn`, null, {
            headers: getAuthHeader(),
        });

        dispatch({ type: 'approveReturnSuccess' });
    } catch (error) {
        dispatch({ type: 'approveReturnFailure', payload: "Error in approving return" });
    }
};




