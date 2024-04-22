import { searchHistoryApi } from "../../../api/searchHistory/searchHistoryApi";
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    searchHistory: [],
    loading: false,
    error: null,
};

export const getAllSearchHistoryAction = (limit, page, lang) => async (dispatch) => {
    try {
        dispatch(actions.getAllSearchHistory());
        const response = await searchHistoryApi.getHistoryKeyWord(limit, page, lang);
        if (response && response.data) {
            dispatch(actions.getAllSearchHistorySuccess(response.data.data));
        }
    } catch (error) {
        console.log('error from getAllSearchHistoryAction', error.message);
        dispatch(actions.getAllSearchHistoryFailed(error.message));
    }
}


export const searchHistorySlice = createSlice({
    name: 'searchHistory',
    initialState: initState,
    reducers: {
        getAllSearchHistory: (state) => {
            state.loading = true;
        },
        getAllSearchHistorySuccess: (state, action) => {
            state.loading = false;
            state.searchHistory = action.payload;
        },
        getAllSearchHistoryFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { actions } = searchHistorySlice;

export default searchHistorySlice.reducer;