import axiosConfig from "../../config/axiosConfig"
import { CONST_API_V1 } from "../contants/urlContant"
import * as SecureStore from 'expo-secure-store';

export const applicationsApi = {
    getAllSubmitedApplied: async (
        limit: number,
        lang: string,
        page: number
    ) => {
        const URL = `${CONST_API_V1}/api/v1/history/applicator/applications?limit=${limit}&lang=${lang}&page=${page}`
        return await axiosConfig.get(URL, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync('token')}`,
            },
        })
    },
}