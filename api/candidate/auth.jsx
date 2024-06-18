import axiosConfig from "../../config/axiosConfig";
import * as SecureStore from "expo-secure-store";
import { CONST_API, CONST_API_V1 } from "../contants/urlContant";

export const authCandidate = {
    signInCandidate: async (email, password) => {

        const URL = "/api/v1/sign-in/candidate";

        const data = {
            email: email,
            password: password,
        };

        return axiosConfig.post(URL, data).then((res) => {
            return res.data;
        });
    },
    modifyPassword: async (password, newPassword) => {
        const URL = `${CONST_API_V1}/api/v1/sign-in/modify-password`;

        const data = {
            oldPassword: password,
            newPassword: newPassword,
        };

        return await axiosConfig.post(URL, data, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
            },
        })
    },
    forgotPaswordApp: async (email) => {
        const URL = `${CONST_API}/api/v3/users/app/forgot-password`;

        const data = {
            email: email,
        };

        return await axiosConfig.post(URL, data);
    },
    confirmOtpApp: async (email, otp) => {
        const URL = `${CONST_API}/api/v3/users/app/confirm-otp`;

        const data = {
            email: email,
            otp: otp,
        };

        return await axiosConfig.post(URL, data);
    },
    resetPasswordApp: async (email, password) => {
        const URL = `${CONST_API}/api/v3/users/app/reset-password`;

        const data = {
            email: email,
            newPassword: password,
        };

        return await axiosConfig.post(URL, data);
    },
};
