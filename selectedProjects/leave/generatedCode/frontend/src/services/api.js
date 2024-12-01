import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000/api",
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
export const login = (data) => api.post("/auth/login", data);
export const createUser = (data) => api.post("/users", data);
export const getUsers = () => api.get("/users");
export const createLeaveRequest = (data) => api.post("/leaves", data);
export const getLeaveRequests = () => api.get("/leaves");
export const updateLeaveStatus = (id, status) =>
  api.put(`/leaves/${id}/status`, { status });
export const assignRole = (data) => api.post("/roles", data);
