import axios from "axios";
export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";
export const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
  headers: { "Content-Type": "application/json" },
});
const api = axiosInstance;
api.interceptors.request.use((config) => {const token = localStorage.getItem('token');if (token) {config.headers.Authorization = `Bearer ${token}`;}return config;});
export const login = async (credentials) => {const response = await api.post('/api/auth/login', credentials);return response.data;};
export const register = async (userData) => {const response = await api.post('/api/auth/register', userData);return response.data;};
export const getRecommendations = async () => {const response = await api.get('/api/recommendations');return response.data;};
export const createRecommendation = async (data) => {const response = await api.post('/api/recommendations', data);return response.data;};
export const getFriends = async () => {const response = await api.get('/api/friendships/friends');return response.data;};
export const sendFriendRequest = async (friendId) => {const response = await api.post(`/api/friendships/request/${friendId}`);return response.data;};
export const acceptFriendRequest = async (userId) => {const response = await api.put(`/api/friendships/accept/${userId}`);return response.data;};
export const getContent = async () => {const response = await api.get('/api/content');return response.data;};
export const removeContent = async (contentId) => {const response = await api.delete(`/api/content/${contentId}`);return response.data;};
export const updateUser = async (userId, data) => {const response = await api.put(`/api/users/${userId}`, data);return response.data;};
export const updateProfile = async (data) => {const response = await api.put('/api/profile', data);return response.data;};
export const getUsers = async () => {const response = await api.get('/api/users');return response.data;};