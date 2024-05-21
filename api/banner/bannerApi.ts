import { CONST_API_V1 } from "../contants/urlContant"
import axios from 'axios'

export const bannerApi = {
    getAllBanner: async () => {
        const URL = `${CONST_API_V1}/api/v1/banners/ena?v=1`

        return await axios.get(URL)
    }
}
