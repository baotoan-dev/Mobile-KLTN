import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducer/rootReducer.js";
import { AppRegistry } from "react-native";

const store = configureStore({
    reducer: rootReducer,
});

export default store;

