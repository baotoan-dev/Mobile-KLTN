import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import axiosConfig from "../../config/axiosConfig"
import { CONST_API_V1 } from "../contants/urlContant"
import * as SecureStore from 'expo-secure-store';

export const keywordNotificationApi = {
    createKeyWordNotification: async (keyword, categoryId, districtId) => {
        const URL = `${CONST_API_V1}/api/v1/notification/keyword`
        return await axiosConfig.post(URL, {
            keyword: keyword,
            category_id: categoryId,
            category_status: 1,
            district_id: districtId,
            district_status: 1
        }, {
            headers: {
                'Authorization': `Bearer ${await SecureStore.getItemAsync('token')}`
            }
        })
    },
    getKeyWordNotification: async () => {
        const URL = `${CONST_API_V1}/api/v1/notification/keyword`
        return await axiosConfig.get(URL, {
            headers: {
                'Authorization': `Bearer ${await SecureStore.getItemAsync('token')}`
            }
        })
    },
    deleteKeyWordNotification: async (id) => {
        const URL = `${CONST_API_V1}/api/v1/notification/keyword/delete`;
        return await axiosConfig.delete(URL, {
            headers: {
                'Authorization': `Bearer ${await SecureStore.getItemAsync('token')}`
            },
            data: {
                keywordNotificationIds: [id]
            }
        });
    },
    updateStatusKeyWordNotification: async (id, status) => {
        const URL = `${CONST_API_V1}/api/v1/notification/keyword/update-status`;
        return await axiosConfig.put(URL, {
            id: id,
            status: status
        }, {
            headers: {
                'Authorization': `Bearer ${await SecureStore.getItemAsync('token')}`
            }
        });
    }

}