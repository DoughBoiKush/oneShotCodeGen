import axios from "axios";
const api = axios.create({
  baseURL: "${process.env.REACT_APP_API_URL}/api",
  headers: { "Content-Type": "application/json" },
});
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
export const login = (credentials) => api.post("/auth/login", credentials);
export const register = (userData) => api.post("/auth/register", userData);
export const getAllPlaces = () => api.get("/places");
export const createPlace = (placeData) => api.post("/places", placeData);
export const updatePlace = (id, placeData) =>
  api.put(`/places/${id}`, placeData);
export const createReview = (reviewData) => api.post("/reviews", reviewData);
export const getReviews = () => api.get("/reviews");
export const logConsumption = (consumptionData) =>
  api.post("/consumption", consumptionData);
export const getStats = () => api.get("/consumption/stats");
