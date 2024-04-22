import { companyApi } from "../../../../api/company/companyApi";
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    companyRatingOfAccount: {},
    loading: false,
    error: null
}

export const getCompanyRatingOfAccountAction = (id, lang) => async (dispatch) => {
    try {
        dispatch(actions.getCompanyRatingOfAccountStart());
        const response = await companyApi.getReviewAccountOfCompany(id, lang);
        dispatch(actions.getCompanyRatingOfAccountSuccess(response.data));
    } catch (error) {
        dispatch(actions.getCompanyRatingOfAccountFail(error));
    }
}

export const deleteCompanyReviewAction = (id) => async (dispatch) => {
    try {
        dispatch(actions.deleteCompanyReviewStart());
        const res = await companyApi.deleteCompanyReview(id);
        if (res.data.statusCode === 200) {
            dispatch(actions.deleteCompanyReviewSuccess());
        }
    }
    catch (error) {
        dispatch(actions.deleteCompanyReviewFail(error.message)); 
    }
}


const companyRatingOfAccountSlice = createSlice({
    name: 'companyRatingOfAccount',
    initialState: initState,
    reducers: {
        getCompanyRatingOfAccountStart: (state) => {
            state.loading = true
        },
        getCompanyRatingOfAccountSuccess: (state, action) => {
            state.companyRatingOfAccount = action.payload
            state.loading = false
            state.error = null
        },
        getCompanyRatingOfAccountFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        deleteCompanyReviewStart: (state) => {
            state.loading = true
        },
        deleteCompanyReviewSuccess: (state) => {
            state.loading = false
            state.error = null
        },
        deleteCompanyReviewFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { actions } = companyRatingOfAccountSlice

export default companyRatingOfAccountSlice.reducer