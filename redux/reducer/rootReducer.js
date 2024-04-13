import { combineReducers } from "@reduxjs/toolkit";
import profileReducer from "../store/Profile/profileSilce";
import searchReducer from "../store/Search/searchSlice";
import locationReducer from "../store/Location/locationSlice";
import getAllPostCompanyReducer from "../store/Company/GetAllPostCompany/getAllPostCompany";
import categoriesReducer from "../store/Categories/categoriesSlice";
import searchHistoryReducer from "../store/SearchHistory/getAllSearchHistorySlice";
import cvProjectReducer from "../store/CvProject/cvProjectSlice";
import cvExtraInformationReducer from "../store/CvExtraInformation/CvExtraInformationSlice";
import profileAnalyticReducer from "../store/Profile/ProfileAnalytic/profileAnalyticSlice";
import messageReducer from "../store/Chat/chatSlice";

const rootReducer = combineReducers({
    profile: profileReducer,
    search: searchReducer,
    location: locationReducer,
    getAllPostCompany: getAllPostCompanyReducer,
    categories: categoriesReducer,
    searchHistory: searchHistoryReducer,
    cvProject: cvProjectReducer,
    cvExtraInformation: cvExtraInformationReducer,
    profileAnalytic: profileAnalyticReducer,
    chat: messageReducer,
});

export default rootReducer;