import { Container } from "@mui/material";
import { Header } from "../components/layout/Header";
import { RecommendationsList } from "../components/recommendations/RecommendationsList";
export const HomePage = () => {
  const menuItems = [
    { label: "Home", path: "/dashboard" },
    { label: "Friends", path: "/friends" },
    { label: "Admin", path: "/admin" },
  ];
  return (
    <>
      <Header title="FriendFlix" menuItems={menuItems} />
      <Container>
        <RecommendationsList />
      </Container>
    </>
  );
};
