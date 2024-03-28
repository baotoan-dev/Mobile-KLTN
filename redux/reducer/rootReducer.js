import { combineReducers } from "@reduxjs/toolkit";
import profileReducer from "../store/Profile/profileSilce";

const rootReducer = combineReducers({
    profile: profileReducer,
});

export default rootReducer;