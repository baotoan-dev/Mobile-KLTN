import { keywordNotificationApi } from "../../../../api/keywordNotification/keywordNotificationApi";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    keywordNotification: [],
    loading: false,
    error: null,
}

export const getAllKeywordNotificationAction = () => async (dispatch) => {
    dispatch(getAllKeywordNotification());
    try {
        const res = await keywordNotificationApi.getKeyWordNotification();
        if (res && res.data.success === true) {
            dispatch(getAllKeywordNotificationSuccess(res.data.data));
        } else {
            dispatch(getAllKeywordNotificationFailure(res.data.message));
        }
    } catch (error) {
        dispatch(getAllKeywordNotificationFailure(error.message));
    }
}

const getAllKeywordNotificationSlice = createSlice({
    name: 'getAllKeywordNotification',
    initialState,
    reducers: {
        getAllKeywordNotification: (state) => {
            state.loading = true;
        },
        getAllKeywordNotificationSuccess: (state, action) => {
            state.loading = false;
            state.keywordNotification = action.payload;
        },
        getAllKeywordNotificationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getAllKeywordNotification,
    getAllKeywordNotificationSuccess,
    getAllKeywordNotificationFailure,
} = getAllKeywordNotificationSlice.actions;

export default getAllKeywordNotificationSlice.reducer;

