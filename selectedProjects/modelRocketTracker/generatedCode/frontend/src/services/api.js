import axios from "axios";
export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";
export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});
const api = axiosInstance;
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
const auth = {
  login: (data) => api.post("/api/auth/login", data).then((res) => res.data),
  register: (data) => api.post("/api/auth/register", data).then((res) => res.data),
};
const projects = {
  getAll: () => api.get("/api/projects").then((res) => res.data),
  getById: (id) => api.get(`/api/projects/${id}`).then((res) => res.data),
  create: (data) => api.post("/api/projects", data).then((res) => res.data),
};
const tasks = {
  create: (data) => api.post("/api/tasks", data).then((res) => res.data),
  update: (id, data) => api.put(`/api/tasks/${id}`, data).then((res) => res.data),
};
export { auth, projects, tasks };
