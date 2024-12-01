import React from "react";
import { Container } from "@mui/material";
import { Header } from "../components/layout/Header";
import { ProjectMetricsCards } from "../components/dashboard/ProjectMetricsCards";
import { ActiveProjectsTable } from "../components/dashboard/ActiveProjectsTable";
import { ProgressChart } from "../components/dashboard/ProgressChart";
import { useQuery } from "@tanstack/react-query";
import { projects } from "../services/api";
import { LoadingState } from "../components/common/LoadingState";
export const DashboardPage = () => {
  const { data: projectsData, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: projects.getAll,
  });
  if (isLoading) return <LoadingState />;
  const metrics = [
    { label: "Total Projects", value: projectsData?.length || 0 },
    {
      label: "Completed",
      value: projectsData?.filter((p) => p.status === "completed").length || 0,
    },
    {
      label: "In Progress",
      value:
        projectsData?.filter((p) => p.status === "in_progress").length || 0,
    },
  ];
  const chartData = [
    {
      name: "Completed",
      value: projectsData?.filter((p) => p.status === "completed").length || 0,
    },
    {
      name: "In Progress",
      value:
        projectsData?.filter((p) => p.status === "in_progress").length || 0,
    },
  ];
  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Projects", path: "/projects" },
  ];
  return (
    <>
      <Header title="Dashboard" menuItems={menuItems} />
      <Container sx={{ mt: 4 }}>
        <ProjectMetricsCards metrics={metrics} />
        <ActiveProjectsTable projects={projectsData || []} />
        <ProgressChart data={chartData} />
      </Container>
    </>
  );
};
