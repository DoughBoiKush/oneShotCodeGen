import axios from "axios";
export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";
export const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
  headers: { "Content-Type": "application/json" },
});
const api = axiosInstance;
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
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
export const login = async (credentials) => {
  const response = await api.post("/api/auth/login", credentials);
  localStorage.setItem("token", response.token);
  return response;
};
export const getReviews = () => api.get("/api/reviews");
export const createReview = (data) => api.post("/api/reviews", data);
export const getReviewCycles = () => api.get("/api/review-cycles");
export const createReviewCycle = (data) => api.post("/api/review-cycles", data);
