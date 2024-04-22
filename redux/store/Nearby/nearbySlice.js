import { nearbyApi } from "../../../api/nearby/nearbyApi";
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    nearby: [],
    loading: false,
    error: null,
}

export const getAllNearByJobAction = (page, limit, lang, search) => async (dispatch) => {
    dispatch(actions.getAllNearByJobRequest());
    try {
        const response = await nearbyApi.getNearByJob(page, limit, lang, search);
        dispatch(actions.getAllNearByJobSuccess(response.data));
    } catch (error) {
        dispatch(actions.getAllNearByJobFailure(error));
    }
}

export const nearbySlice = createSlice({
    name: 'nearby',
    initialState: initState,
    reducers: {
        getAllNearByJobRequest: (state) => {
            state.loading = true;
        },
        getAllNearByJobSuccess: (state, action) => {
            state.loading = false;
            state.nearby = action.payload;
            state.error = null;
        },
        getAllNearByJobFailure: (state, action) => {
            state.loading = false;
            state.nearby = [];
            state.error = action.payload;
        },
    },
});

export const { actions } = nearbySlice;

export default nearbySlice.reducer;

