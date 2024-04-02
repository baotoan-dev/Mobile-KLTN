import { combineReducers } from "@reduxjs/toolkit";
import profileReducer from "../store/Profile/profileSilce";
import searchReducer from "../store/Search/searchSlice";
import locationReducer from "../store/Location/locationSlice";
import getAllPostCompanyReducer from "../store/Company/GetAllPostCompany/getAllPostCompany";
import categoriesReducer from "../store/Categories/categoriesSlice";

const rootReducer = combineReducers({
    profile: profileReducer,
    search: searchReducer,
    location: locationReducer,
    getAllPostCompany: getAllPostCompanyReducer,
    categories: categoriesReducer,
});

export default rootReducer;