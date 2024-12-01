import { Container } from "@mui/material";
import { Header } from "../components/layout/Header";
import { ProfileForm } from "../components/profile/ProfileForm";
import { UserStatsCard } from "../components/profile/UserStatsCard";
export const ProfilePage = () => {
  const menuItems = [
    { label: "Home", path: "/dashboard" },
    { label: "Friends", path: "/friends" },
    { label: "Admin", path: "/admin" },
  ];
  return (
    <>
      <Header title="FriendFlix" menuItems={menuItems} />
      <Container>
        <ProfileForm />
        <UserStatsCard
          stats={[
            { name: "Recommendations", value: 10 },
            { name: "Ratings", value: 20 },
          ]}
        />
      </Container>
    </>
  );
};
