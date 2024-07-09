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

        if ((error.response.status === 403 || error.response.status === 400 || error.response.status === 401) && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = await SecureStore.getItemAsync("refreshToken");

            if (!refreshToken) {
                await SecureStore.deleteItemAsync("token");
                await SecureStore.deleteItemAsync("refreshToken");
                return Promise.reject(error);
            }

            const URL = "/api/v1/reset-access-token";
            const data = {
                refreshToken: refreshToken,
            };

            try {
                const res = await axiosConfig.post(URL, data);

                if (res.data.code === 200) {
                    await SecureStore.setItemAsync("token", res.data.data.accessToken);
                    originalRequest.headers['Authorization'] = `Bearer ${res.data.data.accessToken}`;
                    return axiosConfig(originalRequest);
                } else {
                    await SecureStore.deleteItemAsync("token");
                    await SecureStore.deleteItemAsync("refreshToken");
                    return Promise.reject(error);
                }
            } catch (refreshError) {
                await SecureStore.deleteItemAsync("token");
                await SecureStore.deleteItemAsync("refreshToken");
                return Promise.reject(refreshError);
            }
        }
        
        // Nếu đã thử lại mà vẫn lỗi, từ chối yêu cầu
        return Promise.reject(error);
    }
);

export default axiosConfig;
