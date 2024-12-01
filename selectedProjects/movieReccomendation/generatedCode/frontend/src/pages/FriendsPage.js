import { Container } from "@mui/material";
import { Header } from "../components/layout/Header";
import { FriendsList } from "../components/friends/FriendsList";
export const FriendsPage = () => {
  const menuItems = [
    { label: "Home", path: "/dashboard" },
    { label: "Friends", path: "/friends" },
    { label: "Admin", path: "/admin" },
  ];
  return (
    <>
      <Header title="FriendFlix" menuItems={menuItems} />
      <Container>
        <FriendsList />
      </Container>
    </>
  );
};
