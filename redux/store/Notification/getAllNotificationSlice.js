import { notificationApi } from "../../../api/notification/notificationApi"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    notifications: [],
    loading: false,
    error: null
}

export const getAllNoticationAction = () => async (dispatch) => {
    dispatch(getAllNotificationStart())
    try {
        const response = await notificationApi.getNotification('vi')
        dispatch(getAllNotificationSuccess(response.data.data))
    } catch (error) {
        dispatch(getAllNotificationFailure(error))
    }
}

const getAllNotificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        getAllNotificationStart: (state) => {
            state.loading = true
        },
        getAllNotificationSuccess: (state, action) => {
            state.loading = false
            state.notifications = action.payload
            state.error = null
        },
        getAllNotificationFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

const { reducer, actions } = getAllNotificationSlice

export const { getAllNotificationStart, getAllNotificationSuccess, getAllNotificationFailure } = actions

export default reducer