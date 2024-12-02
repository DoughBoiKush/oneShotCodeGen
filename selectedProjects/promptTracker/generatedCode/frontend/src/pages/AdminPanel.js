import React from "react";
import { Box, Grid } from "@mui/material";
import Header from "../components/common/Header";
import UserGrid from "../components/admin/UserGrid";
import { useQuery } from "react-query";
import axiosInstance from "../services/api";
import LoadingState from "../components/common/LoadingState";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
const AdminPanel = () => {
  const { user } = useAuth();
  const { data: users, isLoading } = useQuery("users", () => axiosInstance.get("/api/users"));
  console.log(user);
  if (user?.role !== "admin") return <Navigate to="/dashboard" />;
  if (isLoading) return <LoadingState />;
  return (
    <Box>
      <Header
        title="Admin Panel"
        menuItems={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Chains", path: "/chains" },
        ]}
      />
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <UserGrid users={users} />
        </Grid>
      </Grid>
    </Box>
  );
};
export default AdminPanel;
