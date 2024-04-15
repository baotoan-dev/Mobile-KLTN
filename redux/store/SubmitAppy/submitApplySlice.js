import { applicationsApi } from "../../../api/applications/applicationsApi";
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    isLoading: false,
    error: null,
    submitApply: []
}

export const getAllSubmitedAppliedAction = (limit, page, lang) => async (dispatch) => {
    try {
        dispatch(actions.getAllSubmitedAppliedRequest());
        const response = await applicationsApi.getAllSubmitedApplied(limit, lang, page);
        if (response && response.data.code === 200) {
            dispatch(actions.getAllSubmitedAppliedSuccess(response.data));
        }
    } catch (error) {
        console.log('error from getAllSubmitedAppliedAction', error.message);
        dispatch(actions.getAllSubmitedAppliedFailure(error.message));
    }
}


const submitApplySlice = createSlice({
    name: 'submitApply',
    initialState: initState,
    reducers: {
        getAllSubmitedAppliedRequest: (state) => {
            state.isLoading = true;
        },
        getAllSubmitedAppliedSuccess: (state, action) => {
            state.isLoading = false;
            state.submitApply = action.payload;
        },
        getAllSubmitedAppliedFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export const { actions } = submitApplySlice;

export default submitApplySlice.reducer;


