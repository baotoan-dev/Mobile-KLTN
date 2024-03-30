import { createSlice } from "@reduxjs/toolkit";
import profileApi from "../../../api/profile/profile";

const initState = {
    profile: {},
    loading: false,
    error: false,
};

export const getProfileAction = (lang) => async (dispatch) => {
    try {
        dispatch(actions.getProfile()); 
        const response = await profileApi.getProfile(lang);

        if (response.status === 200) {
            dispatch(actions.getProfileSuccess(response.data.data)); 
        }
    } catch (error) {
        console.log('error from getProfileAction', error.message);
        dispatch(actions.getProfileFailed(error.message)); 
    }
}

const profileSlice = createSlice({
    name: "profile",
    initialState: initState,
    reducers: {
        getProfile: (state, action) => {
            state.loading = true;
        },
        getProfileSuccess: (state, action) => {
            state.loading = false;
            state.profile = action.payload;
            state.error = false; 
        },
        getProfileFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

const { reducer, actions } = profileSlice;

export const { getProfile, getProfileSuccess, getProfileFailed } = actions;

export default reducer;
