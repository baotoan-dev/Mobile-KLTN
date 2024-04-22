import { companyApi } from "../../../api/company/companyApi";
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    companyRating: [],
    loading: false,
    error: null
}

export const getCompanyRatingAction = (id, page, limit, lang) => async (dispatch) => {
    try {
        dispatch(actions.getCompanyRatingStart());
        const response = await companyApi.getCompanyRating(id, page, limit, lang);
        dispatch(actions.getCompanyRatingSuccess(response.data));
    } catch (error) {
        dispatch(actions.getCompanyRatingFail(error));
    }
}

export const createCompanyRatingAction = (companyId, star, comment) => async (dispatch) => {
    try {
        dispatch(actions.createCompanyRatingStart());
        const response = await companyApi.postCompanyRating(companyId, star, comment);
        console.log(response);
        if (response.status === 200) {
            dispatch(actions.createCompanyRatingSuccess());
        }
    } catch (error) {
        dispatch(actions.createCompanyRatingFail(error));
    }
}

const companyRatingSlice = createSlice({
    name: 'companyRating',
    initialState: initState,
    reducers: {
        getCompanyRatingStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getCompanyRatingSuccess: (state, action) => {
            state.loading = false;
            state.companyRating = action.payload;
        },
        getCompanyRatingFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        createCompanyRatingStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        createCompanyRatingSuccess: (state) => {
            state.loading = false;
        },
        createCompanyRatingFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const { actions } = companyRatingSlice

export default companyRatingSlice.reducer
