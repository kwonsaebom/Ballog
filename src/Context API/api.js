//api.js
import axios from 'axios';
import { API_TOKEN } from "@env";

const api = axios.create({
  baseURL: 'https://api.ballog.store',
});

// Request interceptor to add the token to headers
api.interceptors.request.use(
  (config) => {
    if (API_TOKEN) {
      config.headers.Authorization = `Bearer ${API_TOKEN}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;