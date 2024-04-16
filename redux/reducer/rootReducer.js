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
import followCompanyReducer from "../store/FollowCompany/followCompanySlice";
import viewProfileReducer from "../store/ViewProfile/viewProfileSlice";
import bookmarkReducer from "../store/Bookmark/bookmarkSlice";
import submitApplyReducer from "../store/SubmitAppy/submitApplySlice";
import newPostReducer from "../store/NewPost/newPostSlice";
import nearbyReducer from "../store/Nearby/nearbySlice";

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
    follow: followCompanyReducer,
    viewProfile: viewProfileReducer,
    bookmark : bookmarkReducer,
    submitApply: submitApplyReducer,
    newPost: newPostReducer,
    nearby: nearbyReducer,
});

export default rootReducer;