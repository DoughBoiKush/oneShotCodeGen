import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getExpenses = async (token) => {
  const { data } = await axios.get(`${API_URL}/expenses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const submitExpense = async (expenseData, token) => {
  const { data } = await axios.post(`${API_URL}/expenses`, expenseData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
