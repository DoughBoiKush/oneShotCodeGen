import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getAllUsers = async (token) => {
  const { data } = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};