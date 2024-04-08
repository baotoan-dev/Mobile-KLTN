import axiosConfig from "../../config/axiosConfig"
import { CONST_API } from "../contants/urlContant"

export const templateApi = {
    getAllTemplates: async () => {
        const URL = `${CONST_API}/api/v3/cv-template`

        return await axiosConfig.get(URL)
    }
}

