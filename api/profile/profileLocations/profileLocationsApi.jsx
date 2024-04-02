import axiosConfig from "../../../config/axiosConfig"
import { CONST_API_V1 } from "../../contants/urlContant"
import * as SecureStore from 'expo-secure-store';

export const profileLocationsApi = {
    updateProfileLocations : async (data) => {
        try {
            const response = await axiosConfig.put(
                `${CONST_API_V1}/api/v1/profiles/loc`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${await SecureStore.getItemAsync('token')}`
                    }
                }
            )
            return response.data
        } catch (error) {
            throw error
        }
    }
}