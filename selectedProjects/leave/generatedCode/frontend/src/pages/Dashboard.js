import { useState } from "react";
import { Container, Grid, Button } from "@mui/material";
import { Header } from "../components/common/Header";
import { LeaveBalanceCard } from "../components/dashboard/LeaveBalanceCard";
import { LeaveStatusTable } from "../components/dashboard/LeaveStatusTable";
import { LeaveHistoryChart } from "../components/dashboard/LeaveHistoryChart";
import { LeaveRequestModal } from "../components/modals/LeaveRequestModal";
import { useLeaveRequests } from "../hooks/useLeaveRequests";
import { LoadingState } from "../components/common/LoadingState";
export const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { leaves, isLoading, createLeave } = useLeaveRequests();
  const links = [
        { path: "/dashboard", label: "Dashboard" },
        { path: "/leaves", label: "Leave Management" },
        { path: "/admin", label:"Admin Panel"}
  ];
  const handleSubmit = (data) => {
    createLeave(data);
    setIsModalOpen(false);
  };
  if (isLoading) return <LoadingState />;
  return (
    <>
      <Header links={links} />
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button variant="contained" onClick={() => setIsModalOpen(true)}>
              Request Leave
            </Button>
          </Grid>
          <Grid item xs={12}>
            <LeaveBalanceCard balance={{ annual: 20, sick: 10, personal: 5 }} />
          </Grid>
          <Grid item xs={12}>
            <LeaveStatusTable leaves={leaves} />
          </Grid>
          <Grid item xs={12}>
            <LeaveHistoryChart
              data={[{ name: "Jan", annual: 2, sick: 1, personal: 0 }]}
            />
          </Grid>
        </Grid>
        <LeaveRequestModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      </Container>
    </>
  );
};
