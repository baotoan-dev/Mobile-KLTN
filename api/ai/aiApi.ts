import { CONST_API } from "../contants/urlContant"
import axiosConfig from "../../config/axiosConfig"
import * as SecureStore from 'expo-secure-store';

export const aiApi = {
    createCvCategory: async (data) => {
        const URL = `${CONST_API}/api/v3/cv-categories`

        return await axiosConfig.post(URL, {
            data
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${SecureStore.getItemAsync('token')}`,
            },
        })
    }
}