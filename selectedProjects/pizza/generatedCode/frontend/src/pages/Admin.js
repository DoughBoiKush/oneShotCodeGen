import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Header } from "../components/layout/Header";
import { UserManagementGrid } from "../components/admin/UserManagementGrid";
import { SystemSettingsForm } from "../components/admin/SystemSettingsForm";
import { LoadingState } from "../components/shared/LoadingState";
import { useProtectedRoute } from "../hooks/useProtectedRoute";
export const Admin = () => {
  useProtectedRoute("admin");
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => [],
  });
  if (isLoading) return <LoadingState />;
  return (
    <Box>
      <Header title="Admin Panel" menuItems={[]} />
      <Box sx={{ p: 3 }}>
        <UserManagementGrid users={users || []} onUserSelect={() => {}} />
        <SystemSettingsForm settings={{}} onSubmit={() => {}} />
      </Box>
    </Box>
  );
};
