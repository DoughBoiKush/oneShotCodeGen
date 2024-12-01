import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Dashboard } from "./pages/Dashboard";
import { Places } from "./pages/Places";
import { Profile } from "./pages/Profile";
import { Admin } from "./pages/Admin";
import { Auth } from "./pages/Auth";
import { NotFound } from "./pages/NotFound";
export const App = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route
        path="/"
        element={ <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={<Auth />}
      />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/places" element={<Places />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
