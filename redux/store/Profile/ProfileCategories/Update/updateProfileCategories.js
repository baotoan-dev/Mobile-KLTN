import { createSlice } from "@reduxjs/toolkit";
import { profileCategoriesApi } from "../../../../../api/profile/profileCategories/profileCategoriesApi";

const initialState = {
    loading: false,
    success: null,
    error: null,
};

export const updateProfileCategoriesAction = (data) => async (dispatch) => {
    dispatch(actions.updateProfileCategories());
    try {
        const response = await profileCategoriesApi.updateProfileCategories(data);

        if (response && response.code === 200) {
            dispatch(actions.updateProfileCategoriesSuccess(response));
        }

    } catch (error) {
        dispatch(actions.updateProfileCategoriesFailed(error));
    }
}

const updateProfileCategoriesSlice = createSlice({
    name: 'updateProfileCategories',
    initialState,
    reducers: {
        updateProfileCategories: (state) => {
            state.loading = true;
        },
        updateProfileCategoriesSuccess: (state, action) => {
            state.loading = false;
            state.success = action.payload;
            state.error = null;
        },
        updateProfileCategoriesFailed: (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload;
        },
    },
});


export const { actions } = updateProfileCategoriesSlice;