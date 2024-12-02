import axios from "axios";
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/';
export const axiosInstance = axios.create({
  baseURL: API_URL,
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
export const login = (data) => api.post("/api/auth/login", data);
export const createUser = (data) => api.post("/api/users", data);
export const getUsers = () => api.get("/api/users");
export const createLeaveRequest = (data) => api.post("/api/leaves", data);
export const getLeaveRequests = () => api.get("/api/leaves");
export const updateLeaveStatus = (id, status) =>
  api.put(`/api/leaves/${id}/status`, { status });
export const assignRole = (data) => api.post("/api/roles", data);
