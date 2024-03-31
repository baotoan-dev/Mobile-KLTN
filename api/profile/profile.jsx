import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const profileApi = {
    getProfile: async (lang) => {
        const URL = `http://10.0.2.2:1902/api/v3/profiles/me?lang=${lang}`;

        const token = await SecureStore.getItemAsync("token");

        return await axios.get(URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
}

export default profileApi;