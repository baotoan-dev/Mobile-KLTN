import { createSlice } from "@reduxjs/toolkit";
import { communityApi } from "../../../../api/community/communityApi";

const initialState = {
    allCommunitOfProile: [],
    loading: false,
    error: null,
}

export const getAllCommunityOfProileAction = (
    page, limit, sort
) => async (dispatch) => {
    dispatch(getAllCommunitOfProileStart());
    try {
        const response = await communityApi.getCommunityByAccount(page, limit, sort);
        dispatch(getAllCommunitOfProileSuccess(response.data));
    } catch (error) {
        dispatch(getAllCommunitOfProileFailure(error));
    }
}

export const allCommunitySlice = createSlice({
    name: 'allCommunity',
    initialState,
    reducers: {
        getAllCommunitOfProileStart: (state) => {
            state.loading = true;
        },
        getAllCommunitOfProileSuccess: (state, action) => {
            state.allCommunitOfProile = action.payload;
            state.loading = false;
            state.error = null;
        },
        getAllCommunitOfProileFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const { getAllCommunitOfProileStart, getAllCommunitOfProileSuccess, getAllCommunitOfProileFailure } = allCommunitySlice.actions;

export default allCommunitySlice.reducer;