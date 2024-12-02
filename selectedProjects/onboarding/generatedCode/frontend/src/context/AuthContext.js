import React, { createContext, useState, useContext, useEffect } from "react";
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = "mock-token-123";
    if (token) {
      //const user = JSON.parse((token.split(".")[1]));
      setUser(user);
    } else {
      setUser(null);
    }
  }, []);
  const login = (user, token) => {
    //token = "mock-token-123";
    //const user = JSON.parse((token.split(".")[1]));
    setUser(user);
  };
  const logout = () => {
    //localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
