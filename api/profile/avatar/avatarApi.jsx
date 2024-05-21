import * as SecureStore from 'expo-secure-store';
import { CONST_API_V1 } from '../../contants/urlContant';
import axiosConfig from '../../../config/axiosConfig';

export const avatarApi = {
    updateAvatar: async (formData) => {
        const URL = `${CONST_API_V1}/api/v1/profiles/avt`;

        try {
            const token = await SecureStore.getItemAsync('token');
            const response = await axiosConfig.put(URL, formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating avatar:', error);
            throw error;
        }
    }
};

