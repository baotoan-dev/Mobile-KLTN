import jobApi from "../../../api/job/jobApi";
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    newPost: {},
    loading: false,
    error: null
}

export const getNewPostAction = (
    childrenCategoryId,
    parentCategoryId,
    districtIds,
    provinceId,
    limit,
    threshold,
    lang,
    page
) => async (dispatch) => {
    try {
        dispatch(actions.getNewPostRequest());
        const res = await jobApi.getPostNewest(
            childrenCategoryId,
            parentCategoryId,
            districtIds,
            provinceId,
            limit,
            threshold,
            lang,
            page
        );
        dispatch(actions.getNewPostSuccess(res.data));
    } catch (error) {
        dispatch(actions.getNewPostFailure(error));
    }
}

const newPostSlice = createSlice({
    name: 'newPost',
    initialState: initState,
    reducers: {
        getNewPostRequest: (state) => {
            state.loading = true;
        },
        getNewPostSuccess: (state, action) => {
            state.loading = false;
            state.newPost = action.payload;
            state.error = null;
        },
        getNewPostFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

const { reducer, actions } = newPostSlice;

export const { getNewPostRequest, getNewPostSuccess, getNewPostFailure } = actions;

export default reducer;