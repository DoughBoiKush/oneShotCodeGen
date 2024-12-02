import axiosInstance from "./api";
export const login = async (credentials) => {
  const response = await axiosInstance.post("/api/auth/login", credentials);
  //console.log(response);
  const { token, user } = response;
  localStorage.setItem("token", token);
  localStorage.setItem("role", user.role);
  return { token, user };
};
export const register = async (userData) => {
  const response = await axiosInstance.post("/api/auth/register", userData);
  localStorage.setItem("token", response.token);
  return response;
};
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
