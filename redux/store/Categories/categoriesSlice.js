import { categoriesApi } from "../../../api/categories/categoriesApi";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    loading: false,
    error: false,
};

export const getCategoriesAction = (search) => async (dispatch) => {
    try {
        dispatch(actions.getCategories());
        const response = await categoriesApi.getCategories('vi', search ? search : '');

        if (response && response.data.code) {
            dispatch(actions.getCategoriesSuccess(response.data.data));
        }
    } catch (error) {
        console.log('error from getCategoriesAction', error.message);
        dispatch(actions.getCategoriesFailed(error.message));
    }
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        getCategories: (state) => {
            state.loading = true;
        },
        getCategoriesSuccess: (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        },
        getCategoriesFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const { actions, reducer } = categoriesSlice;

export default categoriesSlice.reducer;