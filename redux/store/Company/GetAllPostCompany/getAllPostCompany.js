import { createSlice } from '@reduxjs/toolkit';
import { companyApi } from '../../../../api/company/companyApi';

const initState = {
    data: [],
    loading: false,
    error: ''
}

export const getAllPostCompanyAction = (id, limit, page) => {
    return async (dispatch) => {
        dispatch(actions.getAllPostCompany());
        try {
            const res = await companyApi.getAllPostByCompanyId(id, page, limit)

            if (res) {
                dispatch(actions.getAllPostCompanySuccess(res.data.data))
            }
        } catch (error) {
            dispatch(actions.getAllPostCompanyFailed(error.message))
        }
    }
} 

export const getAllPostCompanySlice = createSlice({
    name: 'getAllPostCompany',
    initialState: initState,
    reducers: {
        getAllPostCompany: (state) => {
            state.loading = true
        },
        getAllPostCompanySuccess: (state, action) => {
            state.loading = false
            state.data = action.payload
        },
        getAllPostCompanyFailed: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { actions } = getAllPostCompanySlice

export default getAllPostCompanySlice.reducer