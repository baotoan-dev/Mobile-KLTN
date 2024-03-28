import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const profileApi = {
    getProfile: async (lang) => {
        const URL = `http://10.0.2.2:1902/api/v3/profiles/me?lang=${lang}`;

        const token = await AsyncStorage.getItem('token');

        console.log('token api', token);
        console.log(lang);

        return await axios.get(URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
}

export default profileApi;