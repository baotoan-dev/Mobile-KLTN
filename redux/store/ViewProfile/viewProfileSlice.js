import { viewProfileApi } from "../../../api/viewProfile/ViewProfileApi";
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    viewProfiles: [],
}

export const createViewProfilesAction = (profileId) => async (dispatch) => {
    try {
        const response = await viewProfileApi.createViewProfile(profileId);
        dispatch(setViewProfiles(response.data));
    } catch (error) {
        console.log(error);
    }
}

export const getViewProfilesAction = (page, limit) => async (dispatch) => {
    try {
        const response = await viewProfileApi.getViewProfile(page, limit);
        dispatch(setViewProfiles(response.data.data));
    } catch (error) {
        console.log(error);
    }
}



export const viewProfileSlice = createSlice({
    name: 'viewProfile',
    initialState: initState,
    reducers: {
        setViewProfiles: (state, action) => {
            state.viewProfiles = action.payload;
        }
    }
})

export const { setViewProfiles } = viewProfileSlice.actions;

export default viewProfileSlice.reducer;
