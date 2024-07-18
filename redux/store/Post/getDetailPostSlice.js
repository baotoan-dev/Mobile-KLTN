import jobApi from "../../../api/job/jobApi";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postDetail: {},
    loading: false,
    error: null,
}

export const getDetailPostAction = (postId, lang) => async (dispatch) => {
    try {
        dispatch(getDetailPostStart());
        const res = await jobApi.getPostbyId(postId, lang);
        dispatch(getDetailPostSuccess(res.data));
    } catch (error) {
        console.log(error);
        dispatch(getDetailPostFailure(error));
    }
}

const getDetailPostSlice = createSlice({
    name: 'postDetail',
    initialState,
    reducers: {
        getDetailPostStart: (state) => {
            state.loading = true;
        },
        getDetailPostSuccess: (state, action) => {
            state.loading = false;
            state.postDetail = action.payload;
            state.error = null;
        },
        getDetailPostFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const { getDetailPostStart, getDetailPostSuccess, getDetailPostFailure } = getDetailPostSlice.actions;

export default getDetailPostSlice.reducer;

