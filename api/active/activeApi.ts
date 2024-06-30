import axiosConfig from "../../config/axiosConfig"
import { CONST_API } from "../contants/urlContant"

export const activeApi = {
    sendRequestActive: async (email, lang) => {
        const URL = `${CONST_API}/api/v3/users/app/action-verify-email?lang=${lang}`

        return await axiosConfig.post(URL, {
            email
        })
    },
    verifyOTPActive: async (email, otp, lang) => {
        const URL = `${CONST_API}/api/v3/users/app/vetify-otp-active?lang=${lang}`

        return await axiosConfig.post(URL, {
            email,
            otp
        })
    }
}