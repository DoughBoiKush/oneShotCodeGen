import React from "react";
import { Box, Grid } from "@mui/material";
import Header from "../components/common/Header";
import MetricsCard from "../components/metrics/MetricsCard";
import PromptGrid from "../components/prompts/PromptGrid";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axiosInstance from "../services/api";
import LoadingState from "../components/common/LoadingState";
const Dashboard = () => {
  const queryClient = useQueryClient();
  const { data: prompts, isLoading } = useQuery("prompts", () =>
    axiosInstance.get("/api/prompts")
  );
  const deleteMutation = useMutation((id) => axiosInstance.delete(`/api/prompts/${id}`), {
      onSuccess: () => queryClient.invalidateQueries("prompts"),
    }
  );
  if (isLoading) return <LoadingState />;
  const metrics = {
    totalPrompts: prompts?.length || 0,
    avgRating:
      prompts?.reduce((acc, curr) => acc + curr.rating, 0) /
        prompts?.length || 0,
    chainCount: prompts?.filter((p) => p.Chains?.length > 0).length || 0,
  };
  return (
    <Box>
      <Header
        title="Dashboard"
        menuItems={[
          { label: "Chains", path: "/chains" },
          { label: "Admin", path: "/admin" },
        ]}
      />
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12} md={4}>
          <MetricsCard title="Total Prompts" value={metrics.totalPrompts} />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricsCard
            title="Average Rating"
            value={metrics.avgRating.toFixed(1)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricsCard title="Chain Prompts" value={metrics.chainCount} />
        </Grid>
        <Grid item xs={12}>
          <PromptGrid
            prompts={prompts}
            onDelete={(prompt) => deleteMutation.mutate(prompt.id)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Dashboard;
