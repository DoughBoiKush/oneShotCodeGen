import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
const schema = {
  type: "object",
  required: ["email", "password", "name"],
  properties: {
    name: { type: "string", title: "Name" },
    email: { type: "string", format: "email", title: "Email" },
    password: { type: "string", title: "Password" },
  },
};
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
const uiSchema = { password: { "ui:widget": "password" } };
export default function Signup() {
  const navigate = useNavigate();
  const onSubmit = async ({ formData }) => {
    try {
      await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      navigate("/login");
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
          Sign Up for JobTrax
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
