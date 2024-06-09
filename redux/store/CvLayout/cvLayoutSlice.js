import { cvApi } from "../../../api/cv/cvApi";
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    cvLayout: {},
    loading: false,
    error: ''
};

export const getCvLayoutAction = (cvIndex) => async (dispatch) => {
    try {
        dispatch(actions.getCvLayout());
        const response = await cvApi.getCvLayout(cvIndex);
        if (response && response.data && response.data.statusCode === 200) {
            dispatch(actions.getCvLayoutSuccess(response.data.data));
        }
    } catch (error) {
        console.log('error from getCvLayoutAction', error.message);
        dispatch(actions.getCvLayoutFailed(error.message));
    }
}

export const createCvLayoutAction = (data) => async (dispatch) => {
    try {
        dispatch(actions.createCvLayout());
        const response = await cvApi.createCvLayout(data);
        if (response && response.data) {
            dispatch(actions.createCvLayoutSuccess(response.data));
        }
    } catch (error) {
        console.log('error from createCvLayoutAction', error.message);
        dispatch(actions.createCvLayoutFailed(error.message));
    }
}

export const deleteCvLayoutAction = (cvIndex) => async (dispatch) => {
    try {
        dispatch(actions.getCvLayout());
        const response = await cvApi.deleteCvLayout(cvIndex);
        if (response && response.data) {
            dispatch(actions.deleteCvLayoutSuccess(response.data));
        }
    } catch (error) {
        console.log('error from deleteCvLayoutAction', error.message);
        dispatch(actions.getCvLayoutFailed(error.message));
    }
}


export const cvLayoutSlice = createSlice({
    name: 'cvLayout',
    initialState,
    reducers: {
        getCvLayout: (state) => {
            state.loading = true;
        },
        getCvLayoutSuccess: (state, action) => {
            state.cvLayout = action.payload;
            state.loading = false;
        },
        getCvLayoutFailed: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        createCvLayout: (state) => {
            state.loading = true;
        },
        createCvLayoutSuccess: (state, action) => {
            state.cvLayout = action.payload;
            state.loading = false;
        },
        createCvLayoutFailed: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteCvLayout: (state) => {
            state.loading = true;
        },
        deleteCvLayoutSuccess: (state, action) => {
            state.cvLayout = action.payload;
            state.loading = false;
        },
        deleteCvLayoutFailed: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
});

export const { actions } = cvLayoutSlice;

export default cvLayoutSlice.reducer;