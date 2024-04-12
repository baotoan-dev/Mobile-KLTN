import { CONST_API_V1 } from "../contants/urlContant"
import * as SecureStore from 'expo-secure-store';

export const chatApi = {
    getChatMessage: (uid, pid, lang) => {
        const URL = `${CONST_API_V1}/api/v1/chats/messages?uid=${uid}&pid=${pid}&lang=${lang}`
        return axios.get(URL, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
            },
        })
    },

    getUserChated: (lang) => {
        const URL = `${CONST_API_V1}/api/v1/chats/users?lang=${lang}`
        return axios.get(URL, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
            },
        })
    },

    getUnread: (lang) => {
        const URL = `${CONST_API_V1}/api/v1/chats/unread?lang=${lang}`
        return axios.get(URL, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
            },
        })
    }
}