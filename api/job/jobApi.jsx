import axios from "axios";
import { CONST_API, CONST_API_V1 } from "../contants/urlContant";
import * as SecureStore from 'expo-secure-store';

const jobApi = {
    getPostNewest: async (
        childrenCategoryId,
        parentCategoryId,
        districtIds,
        provinceId,
        limit,
        threshold,
        lang,
        page
    ) => {
        const URL =
            `${CONST_API}/api/v3/posts/newest?` +
            `${childrenCategoryId
                ? `${childrenCategoryId
                    ?.map((n, index) => `childrenCategoryId=${n}`)
                    .join('&')}&`
                : ``
            }` +
            `${parentCategoryId && parentCategoryId !== 1
                ? `&parentCategoryId=${parentCategoryId}&`
                : ``
            }` +
            `${districtIds
                ? `${districtIds
                    ?.map((n, index) => `districtIds=${n}`)
                    .join('&')}&`
                : ``
            }` +
            `${provinceId ? `provinceId=${provinceId}&` : ``}` +
            `limit=${limit}${threshold ? `&threshold=${threshold}` : ``}` +
            `&lang=${lang}&page=${page}`;

        return await axios.get(URL, {
            headers: {
                Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
            },
        });
    },
    getPostbyId: async (params, lang) => {
        const URL = `${CONST_API_V1}/api/v1/posts/${params}?lang=${lang}`;
        return await axios.get(URL, {
            headers: {
                Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
            },
        });
    },
}

export default jobApi;