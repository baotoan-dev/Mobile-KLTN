import profileApi from "../../../../api/profile/profile";
import { createSlice } from "@reduxjs/toolkit";

const initState = {
  profileAnalytic: {},
  loading: false,
  error: null,
};


export const getProfileAnalyticsAction = () => async (dispatch) => {
  dispatch(getProfileAnalyticStart());
  try {
    const response = await profileApi.getAnalytics();
    dispatch(getProfileAnalyticSuccess(response.data.data));
  } catch (error) {
    dispatch(getProfileAnalyticFailure(error));
  }
}

const profileAnalyticSlice = createSlice({
  name: "profileAnalytic",
  initialState: initState,
  reducers: {
    getProfileAnalyticStart: (state) => {
      state.loading = true;
    },
    getProfileAnalyticSuccess: (state, action) => {
      state.loading = false;
      state.profileAnalytic = action.payload;
      state.error = null;
    },
    getProfileAnalyticFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});


const { reducer, actions } = profileAnalyticSlice;

export const { getProfileAnalyticStart, getProfileAnalyticSuccess, getProfileAnalyticFailure } = actions;

export default reducer;