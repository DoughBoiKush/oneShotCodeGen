import api from "./api";
export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  //console.log(response);
  const { token, role } = response;
  console.log(token, role);
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  return { token, role };
};
export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  console.log(response);
  localStorage.setItem("token", response.token);
  return response;
};
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
