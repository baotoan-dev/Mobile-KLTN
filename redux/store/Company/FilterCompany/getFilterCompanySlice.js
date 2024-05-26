import { companyApi } from "../../../../api/company/companyApi";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filterCompany: [],
    loading: false,
    error: null,
}

export const getAllFilterCompanyAction = (
    addresses,
    categories,
    companySizeId,
    limit,
    page,
    lang
) => async (dispatch) => {
    try {
        dispatch(getFilterCompanyStart());
        const response = await companyApi.filterCompany(
            addresses,
            categories,
            companySizeId,
            limit,
            page,
            lang
        );
        dispatch(getFilterCompanySuccess(response.data));
    } catch (error) {
        dispatch(getFilterCompanyFailure(error));
    }
}

// slice
const filterCompanySlice = createSlice({
    name: 'filterCompany',
    initialState,
    reducers: {
        getFilterCompanyStart: (state) => {
            state.loading = true;
        },
        getFilterCompanySuccess: (state, action) => {
            state.filterCompany = action.payload;
            state.loading = false;
            state.error = null;
        },
        getFilterCompanyFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});


export const { getFilterCompanyStart, getFilterCompanySuccess, getFilterCompanyFailure } = filterCompanySlice.actions;

export default filterCompanySlice.reducer;