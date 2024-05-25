import { themeCompanyApi } from "../../../api/themeCompany/themeCompanyApi"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    allThemeCompany: [],
    themeCompany: {},
    loading: false,
}

export const getAllThemeCompanyAction = () => async (dispatch) => {
    dispatch(getAllThemeCompanyRequest())
    try {
        const response = await themeCompanyApi.getAllThemeCompany()

        if (response && response.data.statusCode === 200) {
            dispatch(getAllThemeCompanySuccess(response.data.data))
        }
    } catch (error) {
        dispatch(getAllThemeCompanyFailure(error))
    }
}

// Slice
export const themeCompanySlice = createSlice({
    name: 'themeCompany',
    initialState,
    reducers: {
        getAllThemeCompanyRequest: (state) => {
            state.loading = true
        },
        getAllThemeCompanySuccess: (state, action) => {
            state.loading = false
            state.allThemeCompany = action.payload
        },
        getAllThemeCompanyFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    },
})


export const { getAllThemeCompanyRequest, getAllThemeCompanySuccess, getAllThemeCompanyFailure } = themeCompanySlice.actions

export default themeCompanySlice.reducer
