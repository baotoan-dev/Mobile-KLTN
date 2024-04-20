import { locationApi } from "../../../api/location/locationApi";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    location: {},
    loading: false,
    error: false,
};

export const getLocationAction = (search) => async (dispatch) => {
    try {
        dispatch(actions.getLocation());
        const response = await locationApi.getAllLocation(search);

        if (response && response.data) {
            dispatch(actions.getLocationSuccess(response.data.data));
        }
    } catch (error) {
        console.log('error from getLocationAction', error.message);
        dispatch(actions.getLocationFailed(error.message));
    }
}

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        getLocation: (state) => {
            state.loading = true;
        },
        getLocationSuccess: (state, action) => {
            state.loading = false;
            state.location = action.payload;
        },
        getLocationFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { actions } = locationSlice;
export default locationSlice.reducer;
