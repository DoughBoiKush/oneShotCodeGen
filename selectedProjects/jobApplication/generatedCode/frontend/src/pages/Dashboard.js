import React from "react";
import { Grid, Container } from "@mui/material";
import Header from "../components/layout/Header";
import MetricsCard from "../components/dashboard/MetricsCard";
import ApplicationStatusChart from "../components/dashboard/ApplicationStatusChart";
import RecentApplicationsTable from "../components/dashboard/RecentApplicationsTable";
import { useApplications } from "../hooks/useApplications";
import LoadingState from "../components/common/LoadingState";
const menuItems = [
  { label: "Dashboard", path: "/" },
  { label: "Applications", path: "/applications" },
  { label: "Admin", path: "/admin" },
];
export default function Dashboard() {
  const { data: applications, isLoading } = useApplications();
  if (isLoading) return <LoadingState />;
  const metrics = [
    { title: "Total Applications", value: applications?.length || 0 },
    {
      title: "Pending Review",
      value: applications?.filter((a) => a.status === "review").length || 0,
    },
    {
      title: "Interviews",
      value: applications?.filter((a) => a.status === "interview").length || 0,
    },
    {
      title: "Offers",
      value: applications?.filter((a) => a.status === "offer").length || 0,
    },
  ];
  const chartData = Object.entries(
    applications?.reduce(
      (acc, app) => ({ ...acc, [app.status]: (acc[app.status] || 0) + 1 }),
      {}
    ) || {}
  ).map(([name, value]) => ({ name, value }));
  return (
    <div>
      <Header title="JobTrax" menuItems={menuItems} />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} container spacing={3}>
            {metrics.map((metric, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <MetricsCard {...metric} />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12}>
            <ApplicationStatusChart data={chartData} />
          </Grid>
          <Grid item xs={12}>
            <RecentApplicationsTable
              applications={applications?.slice(0, 5) || []}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
