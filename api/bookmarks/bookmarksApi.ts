import axiosConfig from "../../config/axiosConfig"
import { CONST_API_V1 } from "../contants/urlContant"
import * as SecureStore from 'expo-secure-store'

export const bookmarksApi = {
    createBookMark: async (postId: number) => {
        const URL = `${CONST_API_V1}/api/v1/bookmarks`

        return await axiosConfig.post(
            URL,
            {
                postId: postId,
            },
            {
                headers: {
                    Authorization: `Bearer ${SecureStore.getItemAsync('token')}`,
                },
            }
        )
    },

    deleteBookMark: async (postId: number) => {
        const URL = `${CONST_API_V1}/api/v1/bookmarks`
        return await axiosConfig.delete(URL, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync('token')}`,
            },
            data: {
                postId: postId,
            },
        })
    },
}

