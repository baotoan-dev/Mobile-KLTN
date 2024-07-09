import { aiApi } from "../../../api/ai/aiApi"

const initialState = {
    allJobForCV: [],
    loading: false,
    error: null,
}

export const getAllJobForCVSliceAction = (cvIndex, page, limit) => async (dispatch) => {
    try {
        dispatch(getAllJobForCVSliceActionPending())
        const response = await aiApi.getCvCategory(cvIndex, page, limit)
        dispatch(getAllJobForCVSliceActionSuccess(response.data.data))   
    } catch (error) {
        dispatch(getAllJobForCVSliceActionError(error))
    }
}

const getAllJobForCVSliceActionPending = () => {
    return {
        type: 'getAllJobForCVSliceActionPending',
    }
}

const getAllJobForCVSliceActionSuccess = (data) => {
    return {
        type: 'getAllJobForCVSliceActionSuccess',
        payload: data,
    }
}

const getAllJobForCVSliceActionError = (error) => {
    return {
        type: 'getAllJobForCVSliceActionError',
        payload: error,
    }
}

export const getAllJobForCVSlice = (state = initialState, action) => {
    switch (action.type) {
        case 'getAllJobForCVSliceActionPending':
            return {
                ...state,
                loading: true,
                error: null,
            }
        case 'getAllJobForCVSliceActionSuccess':
            return {
                ...state,
                allJobForCV: action.payload,
                loading: false,
                error: null,
            }
        case 'getAllJobForCVSliceActionError':
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}   

export default getAllJobForCVSlice

