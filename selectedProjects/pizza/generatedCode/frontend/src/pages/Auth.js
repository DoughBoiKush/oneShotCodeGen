import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { LoginForm } from "../components/auth/LoginForm";
import { SignupForm } from "../components/auth/SignupForm";
export const Auth = () => {
  const [tab, setTab] = useState(0);
  return (
    <Box sx={{ mt: 8 }}>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider", width: 400, mx: "auto" }}
      >
        <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
      </Box>
      {tab === 0 ? <LoginForm /> : <SignupForm />}
    </Box>
  );
};
