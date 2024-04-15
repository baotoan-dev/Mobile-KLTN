import { bookmarksApi } from "../../../api/bookmarks/bookmarksApi";
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    bookmarks: [],
    isLoading: false,
    error: null

}

export const getAllBookmarkAction = (threshold, limit, page, lang) => async (dispatch) => {
    try {
        dispatch(actions.getAllBookmarkRequest());
        const response = await bookmarksApi.getAllBookmark(threshold, limit, page, lang);
        if (response && response.data.code === 200) {
            dispatch(actions.getAllBookmarkSuccess(response.data));
        }
    } catch (error) {
        console.log('error from getAllBookmarkAction', error.message);
        dispatch(actions.getAllBookmarkFailure(error.message));
    }
}


const bookmarkSlice = createSlice({
    name: 'bookmark',
    initialState: initState,
    reducers: {
        getAllBookmarkRequest: (state) => {
            state.isLoading = true;
        },
        getAllBookmarkSuccess: (state, action) => {
            state.isLoading = false;
            state.bookmarks = action.payload;
        },
        getAllBookmarkFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        addBookmark: (state, action) => {
            state.bookmarks.push(action.payload);
        },
        removeBookmark: (state, action) => {
            state.bookmarks = state.bookmarks.filter(bookmark => bookmark.id !== action.payload.id);
        }
    }
})

export const { actions } = bookmarkSlice;

export default bookmarkSlice.reducer;
