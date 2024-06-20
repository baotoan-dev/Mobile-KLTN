import { cvApi } from "../../../api/cv/cvApi";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cvInformation: {},
    loading: false,
    error: null,
};

export const getCvInformationAction = (cvIndex) => async (dispatch) => {
    try {
        dispatch(actions.getCvInformation());
        const response = await cvApi.getCvInformation(cvIndex);
        dispatch(actions.getCvInformationSuccess(response.data));
    } catch (error) {
        dispatch(actions.getCvInformationFailure(error));
    }
}

export const createCvInformationAction = (data) => async (dispatch) => {
    try {
        dispatch(actions.createCvInformation());
        const response = await cvApi.createCvInformation(data);
        dispatch(actions.createCvInformationSuccess(response.data));
    } catch (error) {
        dispatch(actions.createCvInformationFailure(error));
    }
}

export const deleteCvInformationAction = (cvIndex) => async (dispatch) => {
    try {
        dispatch(actions.deleteCvInformation());
        await cvApi.deleteCvInformation(cvIndex);
        dispatch(actions.deleteCvInformationSuccess(cvIndex));
    } catch (error) {
        dispatch(actions.deleteCvInformationFailure(error));
    }
}

const cvInformationSlice = createSlice({
    name: "cvInformation",
    initialState,
    reducers: {
        getCvInformation: (state) => {
            state.loading = true;
        },
        getCvInformationSuccess: (state, action) => {
            state.loading = false;
            state.cvInformation = action.payload;
            state.error = null;
        },
        getCvInformationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        createCvInformation: (state) => {
            state.loading = true;
        },
        createCvInformationSuccess: (state, action) => {
            state.loading = false;
            state.cvInformation = action.payload;
            state.error = null;
        },
        createCvInformationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteCvInformation: (state) => {
            state.loading = true;
        },
        deleteCvInformationSuccess: (state, action) => {
            state.loading = false;
            state.cvInformation = state.cvInformation.filter(cv => cv.cvIndex !== action.payload);
            state.error = null;
        },
        deleteCvInformationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});


export const { actions } = cvInformationSlice;

export default cvInformationSlice.reducer;

