import { Container, Grid } from "@mui/material";
import { Header } from "../components/common/Header";
import { UserManagementTable } from "../components/admin/UserManagementTable";
import { RoleAssignmentForm } from "../components/admin/RoleAssignmentForm";
import { useQuery } from "react-query";
import { getUsers } from "../services/api";
import { LoadingState } from "../components/common/LoadingState";
export const AdminPanel = () => {
  const { data: users, isLoading } = useQuery("users", getUsers);
  const links = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/admin", label: "Admin Panel" },
  ];
  if (isLoading) return <LoadingState />;
  return (
    <>
      <Header links={links} />
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <UserManagementTable users={users} />
          </Grid>
          <Grid item xs={12}>
            <RoleAssignmentForm onSubmit={console.log} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
