import { CONST_API } from "../contants/urlContant"
import axiosConfig from "../../config/axiosConfig"
import * as SecureStore from 'expo-secure-store';

export const cvApi = {
    createCvExtraInformation: (data) => {
        const URL = `${CONST_API}/api/v3/api/v3/cv-extra-information`;
        return axiosConfig.post(URL, data, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
                'Content-Type': 'application/json',
            },
        });
    },
    getCvExtraInformation: (cvIndex) => {
        const URL = `${CONST_API}/api/v3/cv-extra-information?cvIndex=${cvIndex}`;
        return axiosConfig.get(URL, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
            },
        });
    },
    createCvProject: async (data) => {
        const URL = `${CONST_API}/api/v3/cv-project`;
        return axiosConfig.post(URL, { data: data }, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
                'Content-Type': 'application/json',
            },
        });
    },
    getCvProject: async (cvIndex) => {
        const URL = `${CONST_API}/api/v3/cv-project?cvIndex=${cvIndex}`;
        return await axiosConfig.get(URL, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
            },
        });
    },
    deleteCvProject: (cvIndex) => {
        const URL = `${CONST_API}/api/v3/cv-project`;
        return axiosConfig.delete(URL,  { data: { cvindex: cvIndex }}, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
            },
        });
    },
    createCvInformation: (data) => {
        const URL = `${CONST_API}/api/v3/cv-information`;
        return axiosConfig.post(URL, data, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
                // form-data
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    getCvInformation: (cvIndex) => {
        const URL = `${CONST_API}/api/v3/cv-information?cvIndex=${cvIndex}`;
        return axiosConfig.get(URL, {
            headers: {
                Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
            },
        });
    }
}