import { CONST_API_V1 } from "../contants/urlContant"
import axios from "axios";

export const keywordApi = {
    getAllPopularKeyword: async () => {
        const URL = `${CONST_API_V1}/api/v1/search/suggest?limit=20`;

        try {
            const response = await axios.get(URL);
            return response;
        } catch (error) {
            return error;
        }
    }
}