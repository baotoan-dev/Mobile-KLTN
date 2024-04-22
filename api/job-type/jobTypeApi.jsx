import { CONST_API_V1 } from "../contants/urlContant";
import axios from "axios";

export const jobTypeApi = {
    getJobType: async (lang) => {
        const response = await axios.get(`${CONST_API_V1}/api/v1/job-types?lang=${lang}`)
        return response.data
    }
}