import axios from "axios";
export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";
export const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
  headers: { "Content-Type": "application/json" },
});
const api = axiosInstance;
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export default api;
