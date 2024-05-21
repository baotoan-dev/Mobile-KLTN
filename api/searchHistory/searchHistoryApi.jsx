import axiosConfig from "../../config/axiosConfig";
import { CONST_API_V1 } from "../contants/urlContant";
import * as SecureStore from 'expo-secure-store'

export const searchHistoryApi = {
    getHistoryKeyWord: async (limit, page, lang) => {
        const URL = `${CONST_API_V1}/api/v1/search/history?limit=${limit}&lang=${lang}&page=${page}`;
        return await axiosConfig.get(URL, {
            headers: {
                Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
            },
        });
    },
    deleteKeywordSearch: async (keyword) => {
        const URL = `${CONST_API_V1}/api/v1/search/history`;

        return await axiosConfig.delete(URL, {
            headers: {
                Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
            },
            data: {
                keyword: keyword,
            },
        });
    },
    deleteAllKeywordSearch: async () => {
        const URL = `${CONST_API_V1}/api/v1/search/history/all`;

        return await axiosConfig.delete(URL, {
            headers: {
                Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
            },
        });
    },
}