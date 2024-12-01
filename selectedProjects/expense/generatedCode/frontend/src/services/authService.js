import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const login = async (credentials) => {
  const { data } = await axios.post(`${API_URL}/login`, credentials);
  return data;
};

export const signup = async (userData) => {
  const { data } = await axios.post(`${API_URL}/signup`, userData);
  return data;
};
