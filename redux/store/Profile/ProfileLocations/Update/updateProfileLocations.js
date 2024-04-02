import { profileLocationsApi } from "../../../../../api/profile/profileLocations/profileLocationsApi";

const initialState = {
    loading: false,
    success: null,
    error: null,
};

export const updateProfileLocationsAction = (data) => async (dispatch) => {
    dispatch(actions.updateProfileLocations());
    try {
        const response = await profileLocationsApi.updateProfileLocations(data);

        if (response && response.code === 200) {
            dispatch(actions.updateProfileLocationsSuccess(response));
        }

    } catch (error) {
        dispatch(actions.updateProfileLocationsFailed(error));
    }
}

const updateProfileLocationsSlice = createSlice({
    name: 'updateProfileLocations',
    initialState,
    reducers: {
        updateProfileLocations: (state) => {
            state.loading = true;
        },
        updateProfileLocationsSuccess: (state, action) => {
            state.loading = false;
            state.success = action.payload;
            state.error = null;
        },
        updateProfileLocationsFailed: (state, action) => {
            state.loading = false;
            state.success = null;
            state.error = action.payload;
        },
    },
});

export const { actions } = updateProfileLocationsSlice;

export default updateProfileLocationsSlice.reducer;