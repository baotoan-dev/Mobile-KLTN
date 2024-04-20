import axiosConfig from "../../../config/axiosConfig";
import { CONST_API } from "../../contants/urlContant";
import * as SecureStore from 'expo-secure-store';

export const profileCVsApi = {
    deleteCvs: async (ids) => {
        const URL = `${CONST_API}/api/v3/profiles-cvs`;

        return axiosConfig.delete(URL, {
            data: {
                ids,
            },
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
            },
        });
    },
    pushTopCv: async (id) => {
        const URL = `${CONST_API}/api/v3/profiles-cvs/${id}`;

        return axiosConfig.put(URL, {}, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
            },
        });
    },
    saveCv: async (data) => {
        const URL = `${CONST_API}/api/v3/profiles-cvs`;

        return axiosConfig.post(URL, data, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
                'Content-Type': 'multipart/form-data',
            },
        });
    }
}