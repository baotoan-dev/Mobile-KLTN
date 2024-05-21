import { communityApi } from "../../../api/community/communityApi";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    communities: [],
    loading: false,
    error: false,
};


export const getCommunitiesAction = (page, limit, sort, type, lang) => async (dispatch) => {
    dispatch(actions.getCommunitiesStart());
    try {
        const res = await communityApi.getCommunityNews(page, limit, sort, type, lang);

        if (res && res.data && res.data.status === 200) {
            dispatch(actions.getCommunitiesSuccess(res.data.data));
        }
    } catch (error) {
        dispatch(actions.getCommunitiesFail());
    }
}

export const communitySlice = createSlice({
    name: 'community',
    initialState,
    reducers: {
        getCommunitiesStart: (state) => {
            state.loading = true;
        },
        getCommunitiesSuccess: (state, action) => {
            state.communities = action.payload;
            state.loading = false;
            state.error = false;
        },
        getCommunitiesFail: (state) => {
            state.loading = false;
            state.error = true;
        }
    }
});

export const { actions } = communitySlice;

export default communitySlice.reducer;