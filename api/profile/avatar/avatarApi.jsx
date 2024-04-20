import * as SecureStore from 'expo-secure-store';
import { CONST_API_V1 } from '../../contants/urlContant';
import axiosConfig from '../../../config/axiosConfig';

export const avatarApi = {
    updateAvatar: async (data) => {
        const URL = `${CONST_API_V1}/api/v1/profiles/avt`;

        return await axiosConfig.put(URL, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${SecureStore.getItemAsync('token')}`,
            }
        });
    }
}
