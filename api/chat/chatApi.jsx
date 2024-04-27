import axiosConfig from "../../config/axiosConfig";
import { CONST_API_V1 } from "../contants/urlContant"
import * as SecureStore from 'expo-secure-store';

export const chatApi = {
    getChatMessage: (uid, pid, lang) => {
        const URL = `${CONST_API_V1}/api/v1/chats/messages?uid=${uid}&pid=${pid}&lang=${lang}`
        return axiosConfig.get(URL, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
            },
        })
    },

    getUserChated: (lang) => {
        const URL = `${CONST_API_V1}/api/v1/chats/users?lang=${lang}`
        return axiosConfig.get(URL, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
            },
        })
    },

    getUnread: (lang) => {
        const URL = `${CONST_API_V1}/api/v1/chats/unread?lang=${lang}`
        return axiosConfig.get(URL, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
            },
        })
    },
    uploadImageChat: async (data) => {
        const token = await SecureStore.getItemAsync('token');
        const URL = `${CONST_API_V1}/api/v1/chats/upload-image`
        return await axiosConfig.post(URL, data, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        })
    }
}