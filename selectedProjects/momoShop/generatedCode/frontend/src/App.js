import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { InventoryPage } from "./pages/InventoryPage";
import { SalesPage } from "./pages/SalesPage";
import { MenuPage } from "./pages/MenuPage";
import { AdminPage } from "./pages/AdminPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AccessDeniedPage } from "./pages/AccessDeniedPage";
const ProtectedRoute = ({ children, admin }) => {
  const { user } = useAuth();
  console.log(user);
  if (!user) return <Navigate to="/login" />;
  if (admin && user.role !== "admin") return <Navigate to="/access-denied" />;
  return children;
};
export const App = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<Navigate to="/dashboard" />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/inventory"
      element={
        <ProtectedRoute>
          <InventoryPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/sales"
      element={
        <ProtectedRoute>
          <SalesPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/menu"
      element={
        <ProtectedRoute>
          <MenuPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin"
      element={
        <ProtectedRoute admin>
          <AdminPage />
        </ProtectedRoute>
      }
    />
    <Route path="/access-denied" element={<AccessDeniedPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
