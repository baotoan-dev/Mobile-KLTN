import { cvApi } from "../../../api/cv/cvApi";
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    cvProject: {},
    loading: false,
    error: ''
};

export const getCvProjectAction = (cvIndex) => async (dispatch) => {
    try {
        dispatch(actions.getCvProject());
        const response = await cvApi.getCvProject(cvIndex);
        if (response && response.data && response.data.status === 200) {
            dispatch(actions.getCvProjectSuccess(response.data.data));
        }
    } catch (error) {
        console.log('error from getCvProjectAction', error.message);
        dispatch(actions.getCvProjectFailed(error.message));
    }
}

export const createCvProjectAction = (data) => async (dispatch) => {
    try {
        dispatch(actions.createCvProject());
        const response = await cvApi.createCvProject(data);
        if (response && response.data) {
            dispatch(actions.createCvProjectSuccess(response.data));
        }
    } catch (error) {
        console.log('error from createCvProjectAction', error.message);
        dispatch(actions.createCvProjectFailed(error.message));
    }
}

export const deleteCvProjectAction = (cvIndex) => async (dispatch) => {
    try {
        dispatch(actions.getCvProject());
        const response = await cvApi.deleteCvProject(cvIndex);
        if (response && response.data) {
            dispatch(actions.deleteCvProjectSuccess(response.data));
        }
    } catch (error) {
        console.log('error from deleteCvProjectAction', error.message);
        dispatch(actions.getCvProjectFailed(error.message));
    }
}



export const cvProjectSlice = createSlice({
    name: 'cvProject',
    initialState,
    reducers: {
        getCvProject: (state) => {
            state.loading = true;
        },
        getCvProjectSuccess: (state, action) => {
            state.cvProject = action.payload;
            state.loading = false;
        },
        getCvProjectFailed: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        createCvProject: (state) => {
            state.loading = true;
        },
        createCvProjectSuccess: (state, action) => {
            state.cvProject = action.payload;
            state.loading = false;
        },
        createCvProjectFailed: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteCvProject: (state) => {
            state.loading = true;
        },
        deleteCvProjectSuccess: (state, action) => {
            state.cvProject = action.payload;
            state.loading = false;
        },
        deleteCvProjectFailed: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
})

export const { actions } = cvProjectSlice

export default cvProjectSlice.reducer


