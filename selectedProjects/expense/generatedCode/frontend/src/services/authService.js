import axios from "axios";
const API_URL = "http://localhost:3000/api";
export const login = async (credentials) => {
  const { data } = await axios.post(`${API_URL}/login`, credentials);
  return data;
};
export const signup = async (userData) => {
  const { data } = await axios.post(`${API_URL}/signup`, userData);
  return data;
};
