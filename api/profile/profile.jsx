import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { CONST_API } from "../contants/urlContant";

const profileApi = {
    getProfile: async (lang) => {
        const URL = `${CONST_API}/api/v3/profiles/me?lang=${lang}`;

        const token = await SecureStore.getItemAsync("token");

        return await axios.get(URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    updateProfileJob: async (data) => {
        const URL = `${CONST_API}/api/v3/profiles/job`;

        const token = await SecureStore.getItemAsync("token");

        return await axios.put(URL, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}

export default profileApi;