import { CONST_API_V1 } from "../contants/urlContant"
import axiosConfig from "../../config/axiosConfig"
import * as SecureStore from 'expo-secure-store';
export const nearbyApi = {
    getNearByJob: (
        page,
        limit,
        lang,
        search
    ) => {
        const URL = `${CONST_API_V1}/api/v1/posts/nearby?page=${page ? +page : 0}&limit=${limit ? +limit : 10}` + (search ? `&search=${search}` : '');
        
        return axiosConfig(URL, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync('token')}`,
            },
        });
    },
}