import { CONST_API_V1 } from "../contants/urlContant"
import axiosConfig from "../../config/axiosConfig"

export const locationApi = {
    getAllLocation: (search) => {
        const URL = `${CONST_API_V1}/api/v1/locations?search=${search}`
        return axiosConfig.get(URL)
    },
    getProvince: async (search) => {
        const URL = `${CONST_API_V1}/api/v1/locations/p?search=${search}`
        return await axiosConfig.get(URL)
    },
}