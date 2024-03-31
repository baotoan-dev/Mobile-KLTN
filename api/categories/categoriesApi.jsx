import axiosConfig from "../../config/axiosConfig";
import { CONST_API_V1 } from "../contants/urlContant";

export const categoriesApi = {
    getCategories: async (lang, search) => {
        const URL = `${CONST_API_V1}/api/v1/categories?lang=${lang ? lang : 'vi'}&search=${search ? search : ''}`;
        return await axiosConfig.get(URL);
    }
}