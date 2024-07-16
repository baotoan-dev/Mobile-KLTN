import { createSlice } from "@reduxjs/toolkit";
import { communityApi } from "../../../../api/community/communityApi";

const initialState = {
    allHistoryCommunitOfProile: [],
    loading: false,
    error: null,
}

export const getAllHistoryCommunityOfProileAction = (
    page, limit, sort
) => async (dispatch) => {
    dispatch(getAllHistoryCommunitOfProileStart());
    try {
        const response = await communityApi.getHistoryCommunityByAccount(page, limit, sort);
        dispatch(getAllHistoryCommunitOfProileSuccess(response.data));
    } catch (error) {
        dispatch(getAllHistoryCommunitOfProileFailure(error));
    }
}

export const allHistoryCommunitySlice = createSlice({
    name: 'allHistoryCommunity',
    initialState,
    reducers: {
        getAllHistoryCommunitOfProileStart: (state) => {
            state.loading = true;
        },
        getAllHistoryCommunitOfProileSuccess: (state, action) => {
            state.allHistoryCommunitOfProile = action.payload;
            state.loading = false;
            state.error = null;
        },
        getAllHistoryCommunitOfProileFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const { getAllHistoryCommunitOfProileStart, getAllHistoryCommunitOfProileSuccess, getAllHistoryCommunitOfProileFailure } = allHistoryCommunitySlice.actions;

export default allHistoryCommunitySlice.reducer;

