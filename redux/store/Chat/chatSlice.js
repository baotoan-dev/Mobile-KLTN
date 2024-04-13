import { chatApi } from "../../../api/chat/chatApi";
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    messages: {},
    loading: false, 
    error: null,
};

export const getChatMessageAction = (userId, postId, lang) => async (dispatch) => {
    dispatch(getChatMessageStart());
    try {
        const response = await chatApi.getChatMessage(userId, postId, lang);
        dispatch(getChatMessageSuccess(response.data.data));
    } catch (error) {
        dispatch(getChatMessageFailure(error));
    }
}

const chatSlice = createSlice({
    name: "chat",
    initialState: initState,
    reducers: {
        getChatMessageStart: (state) => {
            state.loading = true;
        },
        getChatMessageSuccess: (state, action) => {
            state.loading = false;
            state.messages = action.payload;
            state.error = null;
        },
        getChatMessageFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

const { reducer, actions } = chatSlice;

export const { getChatMessageStart, getChatMessageSuccess, getChatMessageFailure } = actions;

export default reducer;