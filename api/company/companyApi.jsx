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
    postCompanyRating: (companyId, star, comment) => {
        const URL = `${CONST_API}/api/v3/company-ratings`;
        return axios.post(
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
    }
}

