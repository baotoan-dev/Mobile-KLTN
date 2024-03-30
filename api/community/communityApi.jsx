import axiosConfig from "../../config/axiosConfig";
import { CONST_API } from "../contants/urlContant";

export const communityApi = {
    getCommunityNews: (
        page,
        limit,
        sort,
        type,
        lang,
      ) => {
        const URL = `${CONST_API}/api/v3/communications/news?page=${page}&limit=${limit}&sort=${sort}&type=${type}&lang=${lang}`;
        return axiosConfig.get(URL);
      },
}