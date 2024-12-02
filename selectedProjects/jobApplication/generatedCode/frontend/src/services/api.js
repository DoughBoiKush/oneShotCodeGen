import axios from "axios";

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
export const axiosInstance = axios.create({ baseURL: API_URL });

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
    console.log(credentials, API_URL);
  const response = await api.post("/login", credentials);
  
  localStorage.setItem("token", response.token);
  localStorage.setItem("user", JSON.stringify(response.user));
  return response;
};
export const getApplications = async () => await api.get("/applications");
export const createApplication = async (data) =>
  await api.post("/applications", data);
export const updateApplication = async (id, data) =>
  await api.put(`/applications/${id}`, data);
export const deleteApplication = async (id) =>
  await api.delete(`/applications/${id}`);
