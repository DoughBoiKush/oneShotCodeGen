import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Login } from "./components/auth/Login";
import { Signup } from "./components/auth/Signup";
import { Dashboard } from "./pages/Dashboard";
import { AdminPanel } from "./pages/AdminPanel";
import { LeaveManagement } from "./pages/LeaveManagement";
import { NotFound } from "./pages/NotFound";
import { ErrorPage } from "./pages/ErrorPage";
import { AccessDenied } from "./pages/AccessDenied";
const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role))
    return <Navigate to="/access-denied" />;
  return children;
};
const App = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaves"
        element={
          <ProtectedRoute roles={["manager", "hr", "admin"]}>
            <LeaveManagement />
          </ProtectedRoute>
        }
      />
      <Route path="/access-denied" element={<AccessDenied />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default App;
