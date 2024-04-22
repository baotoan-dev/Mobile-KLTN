import axiosConfig from "../../config/axiosConfig"
import { CONST_API } from "../contants/urlContant"
import * as SecureStore from 'expo-secure-store';

export const viewProfileApi = {
    createViewProfile: async (profileId : string) => {
        const URL = `${CONST_API}/api/v3/view-profiles`

        return await axiosConfig.post(URL, { data: { profileId: profileId } },
            {
                headers: {
                    Authorization: `Bearer ${await SecureStore.getItemAsync('token')}`
                }
            })
    },
    getViewProfile: async (page : any, limit: any) => {
        const URL = `${CONST_API}/api/v3/view-profiles?page=${page}&limit=${limit}`

        return await axiosConfig.get(URL,
            {
                headers: {
                    Authorization: `Bearer ${await SecureStore.getItemAsync('token')}`
                }
            })
    }
}