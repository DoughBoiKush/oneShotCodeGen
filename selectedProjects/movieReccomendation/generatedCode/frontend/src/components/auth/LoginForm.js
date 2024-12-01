import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Alert } from "@mui/material";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import { useAuth } from "../../hooks/useAuth";
import * as api from "../../services/api";
export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const schema = {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", format: "email", title: "Email" },
      password: { type: "string", title: "Password" },
    },
  };
  const uiSchema = { password: { "ui:widget": "password" } };
  const handleSubmit = async ({ formData }) => {
    try {
      const data = await api.login(formData);
      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };
  return (
    <Box sx={{ maxWidth: 400, mx: "auto", p: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Form
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};
