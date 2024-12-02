import React, { useEffect } from "react";
import { Form } from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { login as loginApi } from "../../services/auth";
import { Box, Typography, Paper } from "@mui/material";

const schema = {
  type: "object",
  properties: {
    email: { type: "string", title: "Email" },
    password: { type: "string", title: "Password" },
  },
  required: ["email", "password"],
};

const Login = () => {
  const { login, auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.token) {
      navigate("/dashboard");
    }
  }, [auth?.token, navigate]);

  const onSubmit = async ({ formData }) => {
    try {
      const { token, user } = await loginApi(formData);
      login(token, user.role);
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}>
          PromptTracker - Login
        </Typography>
        <Form schema={schema} validator={validator} onSubmit={onSubmit} />
      </Paper>
    </Box>
  );
};

export default Login;
