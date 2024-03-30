import { combineReducers } from "@reduxjs/toolkit";
import profileReducer from "../store/Profile/profileSilce";
import searchReducer from "../store/Search/searchSlice";

const rootReducer = combineReducers({
    profile: profileReducer,
    search: searchReducer,
});

export default rootReducer;