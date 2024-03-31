import axiosConfig from "../../config/axiosConfig";
import { CONST_API } from "../contants/urlContant";
import * as SecureStore from 'expo-secure-store';
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
  getDetailCommunity: (id) => {
    const URL = `${CONST_API}/api/v3/communications/detail/${id}`;
    return axiosConfig.get(URL, {
      headers: {
        "Content-Type": "application/json",
        "Bearer": "Bearer" + SecureStore.getItemAsync("token"),
      }
    });
  }
}