import { combineReducers } from "@reduxjs/toolkit";
import profileReducer from "../store/Profile/profileSilce";
import searchReducer from "../store/Search/searchSlice";
import locationReducer from "../store/Location/locationSlice";

const rootReducer = combineReducers({
    profile: profileReducer,
    search: searchReducer,
    location: locationReducer
});

export default rootReducer;