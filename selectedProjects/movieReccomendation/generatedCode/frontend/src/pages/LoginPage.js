import { Container } from "@mui/material";
import { Header } from "../components/layout/Header";
import { LoginForm } from "../components/auth/LoginForm";
export const LoginPage = () => {
  return (
    <>
      <Header title="FriendFlix" />
      <Container>
        <LoginForm />
      </Container>
    </>
  );
};
