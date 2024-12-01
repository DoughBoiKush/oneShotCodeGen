import { Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import SubmitExpensePage from "./pages/SubmitExpensePage";
import AdminUserManagementPage from "./pages/AdminUserManagementPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";
const App = () => {
  const { user } = useAuth();
  const ProtectedRoute = ({ children, roles }) => {
    if (!user) return <LoginPage />;
    if (roles && !roles.includes(user.role)) return <ErrorPage />;
    return children;
  };
  return (
    <div>
      {" "}
      <Header />{" "}
      <Routes>
        {" "}
        <Route path="/" element={<LoginPage />} />{" "}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/submit-expense"
          element={
            <ProtectedRoute>
              <SubmitExpensePage />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminUserManagementPage />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />{" "}
        <Route path="*" element={<ErrorPage />} />{" "}
      </Routes>{" "}
    </div>
  );
};
export default App;
