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
  (error) => Promise.reject(error)
);
export const login = (credentials) => api.post("/api/auth/login", credentials);
export const register = (userData) => api.post("/api/auth/register", userData);
export const getAllPlaces = () => api.get("/api/places");
export const createPlace = (placeData) => api.post("/api/places", placeData);
export const updatePlace = (id, placeData) =>
  api.put(`/api/places/${id}`, placeData);
export const createReview = (reviewData) => api.post("/api/reviews", reviewData);
export const getReviews = () => api.get("/api/reviews");
export const logConsumption = (consumptionData) =>
  api.post("/api/consumption", consumptionData);
export const getStats = () => api.get("/api/consumption/stats");
