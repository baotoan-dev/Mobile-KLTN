import axiosConfig from "../../config/axiosConfig";
import * as SecureStore from "expo-secure-store";
import { CONST_API_V1 } from "../contants/urlContant";

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
    }
};
