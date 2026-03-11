import axios, { type InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;
if (!API_BASE_URL) {
  throw new Error(
    "Missing VITE_API_URL. Set it in your environment variables.",
  );
}
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.params = {
        ...config.params,
        token: token,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
/*All requests will be transfered in this file*/

export default api;
