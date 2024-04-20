import axiosConfig from "../../config/axiosConfig";

export const authCandidate = {
    signInCandidate: async (email, password) => {

        const URL = "/api/v1/sign-in/candidate";

        const data = {
            email: email,
            password: password,
        };

        return axiosConfig.post(URL, data).then((res) => {
            return res.data;
        });
    },
};
