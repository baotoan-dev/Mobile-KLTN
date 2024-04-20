import { cvApi } from "../../../api/cv/cvApi"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cvExtraInformation: {},
    loading: false,
    error: ''
}

export const getCvExtraInformationAction = (cvIndex) => async (dispatch) => {
    try {
        dispatch(actions.getCvExtraInformation())
        const response = await cvApi.getCvExtraInformation(cvIndex)
        if (response && response.data && response.data.status === 200) {
            dispatch(actions.getCvExtraInformationSuccess(response.data.data))
        }
    } catch (error) {
        console.log('error from getCvExtraInformationAction', error.message)
        dispatch(actions.getCvExtraInformationFailed(error.message))
    }
}

export const createCvExtraInformationAction = (data) => async (dispatch) => {
    try {
        dispatch(actions.createCvExtraInformation())
        const response = await cvApi.createCvExtraInformation(data)
        if (response && response.data) {
            dispatch(actions.createCvExtraInformationSuccess(response.data))
        }
    } catch (error) {
        console.log('error from createCvExtraInformationAction', error.message)
        dispatch(actions.createCvExtraInformationFailed(error.message))
    }
}


export const deleteCvExtraInformationAction = (cvIndex) => async (dispatch) => {
    try {
        dispatch(actions.getCvExtraInformation())
        const response = await cvApi.deleteCvExtraInformation(cvIndex)
        if (response && response.data) {
            dispatch(actions.deleteCvExtraInformationSuccess(response.data))
        }
    } catch (error) {
        console.log('error from deleteCvExtraInformationAction', error.message)
        dispatch(actions.getCvExtraInformationFailed(error.message))
    }
}


export const cvExtraInformationSlice = createSlice({
    name: 'cvExtraInformation',
    initialState,
    reducers: {
        getCvExtraInformation: (state) => {
            state.loading = true
        },
        getCvExtraInformationSuccess: (state, action) => {
            state.cvExtraInformation = action.payload
            state.loading = false
        },
        getCvExtraInformationFailed: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        createCvExtraInformation: (state) => {
            state.loading = true
        },
        createCvExtraInformationSuccess: (state, action) => {
            state.cvExtraInformation = action.payload
            state.loading = false
        },
        createCvExtraInformationFailed: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        deleteCvExtraInformation: (state) => {
            state.loading = true
        },
        deleteCvExtraInformationSuccess: (state, action) => {
            state.cvExtraInformation = action.payload
            state.loading = false
        },
        deleteCvExtraInformationFailed: (state, action) => {
            state.error = action.payload
            state.loading = false
        }
    }
})

export const { actions } = cvExtraInformationSlice

export default cvExtraInformationSlice.reducer
