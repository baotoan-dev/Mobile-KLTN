// config axios

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const  BASE_URL = "http://10.0.2.2:8888/api/"

const axiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
axiosConfig.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token");
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
        console.log('status', error.response.status);
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = await AsyncStorage.getItem("refreshToken");
            const URL = "/v1/reset-access-token";
            const data = {
                refreshToken: refreshToken,
            };
            return axiosConfig.post(URL, data).then((res) => {
                if (res.status === 201) {
                    AsyncStorage.setItem("token", res.data.token);
                    return axiosConfig(originalRequest);
                }
                else{
                    AsyncStorage.removeItem("token");
                    AsyncStorage.removeItem("refreshToken");
                    return Promise.reject(error);
                }
            });
        }
        return Promise.reject(error);
    }
);


export default axiosConfig;
