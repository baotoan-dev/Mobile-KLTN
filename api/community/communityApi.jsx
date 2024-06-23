import axiosConfig from "../../config/axiosConfig";
import { CONST_API } from "../contants/urlContant";
import * as SecureStore from 'expo-secure-store';

export const communityApi = {
  createCommunity: async (data) => {
    const URL = `${CONST_API}/api/v3/communications`;

    return await axiosConfig.post(URL, data, {
      headers: {
        Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  updateCommunity: async (data, id) => {
    const URL = `${CONST_API}/api/v3/communications/${id}`;

    return await axiosConfig.put(URL, data, {
      headers: {
        Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getCommunityNews: async (
    page,
    limit,
    sort,
    type,
    lang,
  ) => {
    const URL = `${CONST_API}/api/v3/communications/news?page=${page}&limit=${limit}&sort=${sort}&type=${type}&lang=${lang}`;
    return await axiosConfig.get(URL);
  },
  getDetailCommunity: (id) => {
    const URL = `${CONST_API}/api/v3/communications/detail/${id}`;
    return axiosConfig.get(URL, {
      headers: {
        "Content-Type": "application/json",
        "Bearer": "Bearer" + SecureStore.getItemAsync("token"),
      }
    });
  },
  postCommunityLike: (communicationId) => {
    const URL = `${CONST_API}/api/v3/communication-likes`;

    return axiosConfig.post(
      URL,
      {
        communicationId: communicationId,
      },
      {
        headers: {
          Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  },
  postCommunityComment: async (newCommentCommunity) => {
    const URL = `${CONST_API}/api/v3/communication-comments`;
    return await axiosConfig.post(URL, newCommentCommunity, {
      headers: {
        Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deleteComment: (postId, cmtId) => {
    const URL = `${CONST_API}/api/v3/communication-comments/${postId}/${cmtId}`;
    return axiosConfig.delete(URL, {
      headers: {
        Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  putCommunityComment: (
    communicationId,
    commentId,
    data
  ) => {
    const URL = `${CONST_API}/api/v3/communication-comments/${communicationId}/${commentId}`;
    return axiosConfig.put(URL, data, {
      headers: {
        Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  async getCommunityByAccount(
    page,
    limit,
    sort,
  ) {
    const URL = `${CONST_API}/api/v3/communications/by-account?page=${page}&limit=${limit}&sort=${sort}`;

    return axiosConfig.get(URL, {
      headers: {
        Authorization: `Bearer ${SecureStore.getItemAsync("token")}`,
        'Content-Type': 'application/json',
      },
    });
  }
}