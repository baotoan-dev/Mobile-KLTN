import { searchApi } from "../../../api/search/searchApi";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: [],
    loading: false,
    error: false,
};


export const getSearchAction = (
    q,
    page,
    money_type,
    is_working_weekend,
    is_remotely,
    only_company,
    salary_min,
    salary_max,
    start_date,
    end_date,
    jobTypeId,
    category_ids,
    district_ids,
    salary_type,
    lang,
) => async (dispatch) => {
    try {
        dispatch(actions.getSearch());
        const response = await searchApi.getSearchByQueryV2(
            q,
            page,
            money_type,
            is_working_weekend,
            is_remotely,
            only_company,
            salary_min,
            salary_max,
            start_date,
            end_date,
            jobTypeId,
            category_ids,
            district_ids,
            salary_type,
            lang,
        );
        
        if (response && response.data) {
            dispatch(actions.getSearchSuccess(response.data.data));
        }
    } catch (error) {
        console.log('error from getSearchAction', error.message);
        dispatch(actions.getSearchFailed(error.message));
    }
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        getSearch: (state) => {
            state.loading = true;
        },
        getSearchSuccess: (state, action) => {
            state.search = action.payload;
            state.loading = false;
            state.error = false;
        },
        getSearchFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});


const { reducer, actions } = searchSlice;

export const { getSearch, getSearchSuccess, getSearchFailed } = actions;

export default reducer;