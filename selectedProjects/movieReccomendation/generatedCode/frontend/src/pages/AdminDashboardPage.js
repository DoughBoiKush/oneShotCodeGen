import { Container, Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";
import { Header } from "../components/layout/Header";
import { UserManagementGrid } from "../components/admin/UserManagementGrid";
import { ContentModerationGrid } from "../components/admin/ContentModerationGrid";
export const AdminDashboardPage = () => {
  const [tab, setTab] = useState(0);
  const menuItems = [
    { label: "Home", path: "/dashboard" },
    { label: "Friends", path: "/friends" },
    { label: "Admin", path: "/admin" },
  ];
  return (
    <>
      <Header title="FriendFlix Admin" menuItems={menuItems} />
      <Container>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
            <Tab label="User Management" />
            <Tab label="Content Moderation" />
          </Tabs>
        </Box>
        {tab === 0 && <UserManagementGrid />}
        {tab === 1 && <ContentModerationGrid />}
      </Container>
    </>
  );
};
