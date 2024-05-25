import axiosConfig from "../../config/axiosConfig"
import { CONST_API } from "../contants/urlContant"

export const themeCompanyApi = {
    getAllThemeCompany: async () => {
        const URL = `${CONST_API}/api/v3/theme-companies`

        return await axiosConfig.get(URL)
    }
}