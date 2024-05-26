import axios from "axios";
import { CONST_API } from "../contants/urlContant";
import * as SecureStore from 'expo-secure-store';
import axiosConfig from "../../config/axiosConfig";

export const companyApi = {
    getAllCompany: (page, limit) => {
        const URL = `${CONST_API}/api/v3/companies`;
        return axios.get(URL);
    },
    getDetailCompany: (id, lang) => {
        const URL = `${CONST_API}/api/v3/companies/${id}?lang=${lang}`;
        return axios.get(URL);
    },
    postCompanyRating: async (companyId, star, comment) => {
        const URL = `${CONST_API}/api/v3/company-ratings`;
        return await axiosConfig.post(
            URL,
            { companyId, star, comment },
            {
                headers: {
                    Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
                },
            },
        );
    },
    getReviewAccountOfCompany: (id, lang) => {
        const URL = `${CONST_API}/api/v3/company-ratings/account/company/${id}?lang=${lang}`;
        return axiosConfig.get(URL, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
            },
        });
    },
    getCompanyRating: async (id, page, limit, lang) => {
        const URL = `${CONST_API}/api/v3/company-ratings/company/${id}?lang=${lang}&limit=${limit}&page=${page}`;
        return await axiosConfig.get(URL);
    },
    deleteCompanyReview: async (id) => {
        const URL = `${CONST_API}/api/v3/company-ratings/account/company/${id}`;
        return await axiosConfig.delete(URL, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
            },
        });
    },
    getCompanyByName: (name) => {
        const URL = `${CONST_API}/api/v3/companies/by-name?name=${name}`;
        return axios.get(URL);
    },
    getAllPostByCompanyId: (id, page, limit) => {
        const URL = `${CONST_API}/api/v3/companies/all-post/${id}?page=${page}&limit=${limit}`;
        return axios.get(URL);
    },
    createFollowCompanyApi: async (companyId) => {
        const URL = `${CONST_API}/api/v3/follow-companies`;
        return await axiosConfig.post(URL, { companyId }, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
            },
        });
    },
    getFollowCompanyApi: async () => {
        const URL = `${CONST_API}/api/v3/follow-companies`;
        return await axiosConfig.get(URL, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
            },
        });
    },
    filterCompany: async (
        addresses,
        categories,
        companySizeId,
        limit,
        page,
        lang
    ) => {
        const URL =
            `${CONST_API}/api/v3/companies/search?` +
            `${page ? `&page=${page}` : `page=0`}` +
            `${limit ? `&limit=${limit}` : ``}` +
            `${addresses.length > 0
                ? `&${addresses
                    ?.map((n, index) => `addresses=${n[0]}`)
                    .join('&')}`
                : ``
            }` +
            `${categories.length > 0
                ? `&${categories
                    ?.map((n, index) => `categories=${n[0]}`)
                    .join('&')}`
                : ``
            }` +
            `${companySizeId ? `&companySizeId=${companySizeId}` : ``}` +
            `${lang ? `&lang=${lang}` : ``}`;

        return await axiosConfig.get(URL);
    },
    getAllCompanySize: async () => {
        const URL = `${CONST_API}/api/v3/company-sizes`

        return await axios.get(URL);
    }
}

