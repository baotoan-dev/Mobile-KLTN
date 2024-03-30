import axios from "axios";
import { CONST_API } from "../contants/urlContant";

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
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            },
        );
    },
    getReviewAccountOfCompany: (id, lang) => {
        const URL = `${CONST_API}/api/v3/company-ratings/account/company/${id}?lang=${lang}`;
        return axios.get(URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
    },
    getCompanyRating: (id, page, limit, lang) => {
        const URL = `${CONST_API}/api/v3/company-ratings/company/${id}?lang=${lang}&limit=${limit}&page=${page}`;
        return axios.get(URL);
    },
    deleteCompanyReview: (id) => {
        const URL = `${CONST_API}/api/v3/company-ratings/account/company/${id}`;
        return axios.delete(URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
    },
    getCompanyByName: (name) => {
        const URL = `${CONST_API}/api/v3/companies/by-name?name=${name}`;
        return axios.get(URL);
    }
}

