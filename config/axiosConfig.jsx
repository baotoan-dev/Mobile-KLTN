// config axios

import axios from "axios";
import { CONST_API_V1 } from "../api/contants/urlContant";
import * as SecureStore from 'expo-secure-store';

const axiosConfig = axios.create({
    baseURL: CONST_API_V1,
    headers: {
        "Content-Type": "application/json",
    },
});
axiosConfig.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync("token");

        if (token) {
            config.headers
                .Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

// refesh token


axiosConfig.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if ((error.response.status === 403  || error.response.status === 400 ) && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = await SecureStore.getItemAsync("refreshToken");

            const URL = "/api/v1/reset-access-token";
            const data = {
                refreshToken: refreshToken,
            };
            return axiosConfig.post(URL, data).then((res) => {
                if (res.data.code === 200) {
                    SecureStore.setItemAsync("token", res.data.data.accessToken);
                    return axiosConfig(originalRequest);
                }
                else{
                    SecureStore.deleteItemAsync("token");
                    SecureStore.deleteItemAsync("refreshToken");
                    return Promise.reject(error);
                }
            });
        }
        return Promise.reject(error);
    }
);


export default axiosConfig;
