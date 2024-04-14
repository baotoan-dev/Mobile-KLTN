import { companyApi } from "../../../api/company/companyApi";
const { createSlice } = require("@reduxjs/toolkit");

const initState = {
    followCompany: [],
    isLoading: false,
    error: ''
}

export const createFollowCompanyAction = (companyId) => {
    return async (dispatch) => {
        try {
            dispatch(createFollowCompany());
            const response = await companyApi.createFollowCompanyApi(companyId);

            if (response && response.data.statusCode === 200) {
                dispatch(createFollowCompanySuccess(response.data));
            }
        } catch (error) {
            console.log('error', error);
        }
    };
}

export const getFollowCompanyAction = () => {
    return async (dispatch) => {
        try {
            dispatch(getFollowCompany());
            const response = await companyApi.getFollowCompanyApi();
            if (response.status === 200) {
                dispatch(getFollowCompanySuccess(response.data.data));
            }
        } catch (error) {
            console.log('error', error);
        }
    };
}

export const followCompanySlice = createSlice({
    name: 'followCompany',
    initialState: initState,
    reducers: {
        createFollowCompany: (state) => {
            state.isLoading = true;
        },
        createFollowCompanySuccess: (state, action) => {
            state.followCompany = action.payload;
            state.isLoading = false;
        },
        createFollowCompanyFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        getFollowCompany: (state) => {
            state.isLoading = true;
        },
        getFollowCompanySuccess: (state, action) => {
            state.followCompany = action.payload;
            state.isLoading = false;
        },
        getFollowCompanyFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

export const { createFollowCompany, createFollowCompanySuccess, createFollowCompanyFailed, getFollowCompany, getFollowCompanySuccess, getFollowCompanyFailed } = followCompanySlice.actions;

export default followCompanySlice.reducer;

