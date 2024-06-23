import axiosConfig from "../../config/axiosConfig"
import * as SecureStore from 'expo-secure-store'
import { CONST_API_V1 } from "../contants/urlContant"

export const notificationApi = {
    getNotification: async (lang) => {
        const URL = `${CONST_API_V1}/api/v2/notification/all?lang=${lang}`

        return await axiosConfig.get(URL, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
            },
        })
    },
    updateNotification: async (notificationId, isRead, typeText) => {
        const URL = `${CONST_API_V1}/api/v1/notification/update`

        return await axiosConfig.put(URL, {
            notification_id: notificationId,
            is_read: isRead,
            typeText: typeText
        }, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
            },
        })
    }
}