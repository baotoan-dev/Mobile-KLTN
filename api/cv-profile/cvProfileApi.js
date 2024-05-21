import axiosConfig from "../../config/axiosConfig";
import { CONST_API } from "../contants/urlContant"
import * as SecureStore from 'expo-secure-store';

export const cvProfileApi = {
    createCv: async (data) => {
        const URL = `${CONST_API}/api/v3/profiles-cvs`
        return await axiosConfig.post(URL, data, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
                'Content-Type': 'multipart/form-data',
            },
        });
    }
}