import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../services/api";
const schema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string", format: "email", title: "Email" },
    password: { type: "string", title: "Password" },
  },
};
const uiSchema = { password: { "ui:widget": "password" } };
export default function Login() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const onSubmit = async ({ formData }) => {
    try {
      const response = await login(formData);
      authLogin(response.user);
      navigate("/");
    } catch (error) {
      console.error(error);
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
      <Paper sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" mb={3}>
          Login to JobTrax
        </Typography>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          validator={validator}
          onSubmit={onSubmit}
        />
      </Paper>
    </Box>
  );
}
