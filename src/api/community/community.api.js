import { api } from './../../Context API/api';

export const community_api = {
  get: async (post_id) => {
    const result = await api.get(`/community/${post_id}`);
    return result.data;
  },
  post: async (req) => {
    const result = await api.post("/community", req);
    return result.data;
  },
  patch: async (req, post_id) => {
    const result = await api.patch(`/community/${post_id}`, req);
    return result.data;
  },
  delete: async (post_id) => {
    const result = await api.delete(`/community/${post_id}`);
    return result.data;
  },
  get_list: async (type, cursor=null, page=null) => {
    const result = await api.get(`/community/posts`, {
        params: { type, cursor, page }
    });
    return result.data;
  }
};