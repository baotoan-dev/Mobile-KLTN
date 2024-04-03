import { createSlice } from "@reduxjs/toolkit"
import profileApi from "../../../../api/profile/profile"

const initState = {
    loading: false,
    error: null,
    data: null
}

export const updateProfileJobAction = (data) => async (dispatch) => {
    dispatch(actions.updateProfileJobRequest())
    try {
        const response = await profileApi.updateProfileJob(data)

        if (response && response.data.statusCode === 200) {
            dispatch(actions.updateProfileJobSuccess(response))
        }
    } catch (error) {
        dispatch(actions.updateProfileJobFailure(error))
    }
}


const updateProfileJobSlice = createSlice({
    name: 'updateProfileJob',
    initialState: initState,
    reducers: {
        updateProfileJobRequest: (state) => {
            state.loading = true
        },
        updateProfileJobSuccess: (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = null
        },
        updateProfileJobFailure: (state, action) => {
            state.loading = false
            state.data = null
            state.error = action.payload
        }
    }
})

export const { actions } = updateProfileJobSlice

export default updateProfileJobSlice.reducer

