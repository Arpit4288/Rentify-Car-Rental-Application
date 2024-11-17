import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    // All rental agreements
    agreements: [],
    agreementsLoading: false,
    agreementsMessage: null,
    agreementsError: null,

    // Single rental agreement
    agreement: null,
    agreementLoading: false,
    agreementMessage: null,
    agreementError: null,

    // Create rental agreement
    createdAgreement: null,
    createdAgreementLoading: false,
    createdAgreementMessage: null,
    createdAgreementError: null,

    // Update rental agreement
    updatedAgreement: null,
    updatedAgreementLoading: false,
    updatedAgreementMessage: null,
    updatedAgreementError: null,

    // Delete rental agreement
    deletedAgreementLoading: false,
    deletedAgreementMessage: null,
    deletedAgreementError: null,

    // Accept agreement
    acceptAgreementLoading: false,
    acceptAgreementMessage: null,
    acceptAgreementError: null,

    // Approve agreement
    approveAgreementLoading: false,
    approveAgreementMessage: null,
    approveAgreementError: null,

    // Request return
    requestReturnLoading: false,
    requestReturnMessage: null,
    requestReturnError: null,

    // Approve return
    approveReturnLoading: false,
    approveReturnMessage: null,
    approveReturnError: null,
};

export const agreementReducer = createReducer(initialState, {
    // Get all agreements
    getAllAgreementsRequest: (state, action) => {
        state.agreementsLoading = true;
    },
    agreementsFetchSuccess: (state, action) => {
        state.agreementsLoading = false;
        state.agreements = action.payload.reverse();
        state.agreementsMessage = "Success";
        state.agreementsError = null;
    },
    agreementsFetchFailed: (state, action) => {
        state.agreementsLoading = false;
        state.agreements = [];
        state.agreementsMessage = "Failed";
        // state.agreementsError = action.payload;
    },
    clearAgreementsError: (state) => {
        state.agreementsError = null;
    },
    clearAgreementsMessage: (state) => {
        state.agreementsMessage = null;
    },

    // Get agreement by ID
    getAgreementByIdRequest: (state, action) => {
        state.agreementLoading = true;
    },
    getAgreementByIdSuccess: (state, action) => {
        state.agreementLoading = false;
        state.agreement = action.payload;
        state.agreementMessage = "Success";
        state.agreementError = null;
    },
    getAgreementByIdFailed: (state, action) => {
        state.agreementLoading = false;
        state.agreement = null;
        state.agreementMessage = "Failed";
        // state.agreementError = action.payload;
    },
    clearAgreementError: (state) => {
        state.agreementError = null;
    },
    clearAgreementMessage: (state) => {
        state.agreementMessage = null;
    },

    // Create agreement
    createAgreementRequest: (state, action) => {
        state.createdAgreementLoading = true;
    },
    createAgreementSuccess: (state, action) => {
        state.createdAgreementLoading = false;
        state.createdAgreement = action.payload;
        state.createdAgreementMessage = "Success";
        state.createdAgreementError = null;
    },
    createAgreementFailed: (state, action) => {
        state.createdAgreementLoading = false;
        state.createdAgreement = null;
        state.createdAgreementMessage = "Failed";
        // state.createdAgreementError = action.payload;
    },
    clearCreateAgreementError: (state) => {
        state.createdAgreementError = null;
    },
    clearCreateAgreementMessage: (state) => {
        state.createdAgreementMessage = null;
    },

    // Update agreement
    updateAgreementRequest: (state, action) => {
        state.updatedAgreementLoading = true;
    },
    updateAgreementSuccess: (state, action) => {
        state.updatedAgreementLoading = false;
        state.updatedAgreement = action.payload;
        state.updatedAgreementMessage = "Success";
        state.updatedAgreementError = null;
    },
    updateAgreementFailed: (state, action) => {
        state.updatedAgreementLoading = false;
        state.updatedAgreement = null;
        state.updatedAgreementMessage = "Failed";
        // state.updatedAgreementError = action.payload;
    },
    clearUpdateAgreementError: (state) => {
        state.updatedAgreementError = null;
    },
    clearUpdateAgreementMessage: (state) => {
        state.updatedAgreementMessage = null;
    },

    // Delete agreement
    deleteAgreementRequest: (state, action) => {
        state.deletedAgreementLoading = true;
    },
    deleteAgreementSuccess: (state, action) => {
        state.deletedAgreementLoading = false;
        state.deletedAgreementMessage = "Success";
        state.deletedAgreementError = null;
    },
    deleteAgreementFailed: (state, action) => {
        state.deletedAgreementLoading = false;
        state.deletedAgreementMessage = "Failed";
    },
    clearDeleteAgreementError: (state, action) => {
        state.deletedAgreementError = null;
    },
    clearDeleteAgreementMessage: (state, action) => {
        state.deletedAgreementMessage = null;
    },


    // Accept agreement
    acceptAgreementRequest: (state, action) => {
        state.acceptAgreementLoading = true;
    },
    acceptAgreementSuccess: (state, action) => {
        state.acceptAgreementLoading = false;
        state.acceptAgreementMessage = "Success";
        state.acceptAgreementError = null;
    },
    acceptAgreementFailure: (state, action) => {
        state.acceptAgreementLoading = false;
        state.acceptAgreementMessage = "Failed";
        // state.acceptAgreementError = action.payload;
    },
    clearAcceptAgreementError: (state) => {
        state.acceptAgreementError = null;
    },
    clearAcceptAgreementMessage: (state) => {
        state.acceptAgreementMessage = null;
    },

    // Approve agreement
    approveAgreementRequest: (state, action) => {
        state.approveAgreementLoading = true;
    },
    approveAgreementSuccess: (state, action) => {
        state.approveAgreementLoading = false;
        state.approveAgreementMessage = "Success";
        state.approveAgreementError = null;
    },
    approveAgreementFailure: (state, action) => {
        state.approveAgreementLoading = false;
        state.approveAgreementMessage = "Failed";
        // state.approveAgreementError = action.payload;
    },
    clearApproveAgreementError: (state) => {
        state.approveAgreementError = null;
    },
    clearApproveAgreementMessage: (state) => {
        state.approveAgreementMessage = null;
    },

    // Request return
    requestReturnRequest: (state, action) => {
        state.requestReturnLoading = true;
    },
    requestReturnSuccess: (state, action) => {
        state.requestReturnLoading = false;
        state.requestReturnMessage = "Success";
        state.requestReturnError = null;
    },
    requestReturnFailure: (state, action) => {
        state.requestReturnLoading = false;
        state.requestReturnMessage = "Failed";
        // state.requestReturnError = action.payload;
    },
    clearRequestReturnError: (state) => {
        state.requestReturnError = null;
    },
    clearRequestReturnMessage: (state) => {
        state.requestReturnMessage = null;
    },

    // Approve return
    approveReturnRequest: (state, action) => {
        state.approveReturnLoading = true;
    },
    approveReturnSuccess: (state, action) => {
        state.approveReturnLoading = false;
        state.approveReturnMessage = "Success";
        state.approveReturnError = null;
    },
    approveReturnFailure: (state, action) => {
        state.approveReturnLoading = false;
        state.approveReturnMessage = "Failed";
        // state.approveReturnError = action.payload;
    },
    clearApproveReturnError: (state) => {
        state.approveReturnError = null;
    },
    clearApproveReturnMessage: (state) => {
        state.approveReturnMessage = null;
    },
});