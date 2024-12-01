import { useState } from "react";
import { Box, Button, Typography, Alert } from "@mui/material";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import { useAuth } from "../../context/AuthContext";
import * as api from "../../services/api";
const schema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string", format: "email", title: "Email" },
    password: { type: "string", title: "Password", minLength: 6 },
  },
};
export const LoginForm = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const handleSubmit = async ({ formData }) => {
    try {
      const response = await api.login(formData);
      login(response);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <Box sx={{ maxWidth: 400, mx: "auto", p: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Typography variant="h5" sx={{ mb: 3, textAlign: "center", fontWeight: "bold", fontSize: "24px" }}>
        Pizza Tracker
      </Typography>
      <Form schema={schema} validator={validator} onSubmit={handleSubmit} />
    </Box>
  );
};
