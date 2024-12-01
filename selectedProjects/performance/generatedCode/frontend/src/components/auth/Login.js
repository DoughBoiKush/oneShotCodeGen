import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { Form } from "@rjsf/mui";
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
const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const onSubmit = async ({ formData }) => {
    try {
      const response = await login(formData);
      authLogin(response.user);
      navigate("/dashboard");
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
      <Card sx={{ minWidth: 300, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", fontSize: "24px", textAlign: "center" }}
          >
            PerformanceFlow - Login
          </Typography>
          <Form
            schema={schema}
            onSubmit={onSubmit}
            validator={validator}
          />
        </CardContent>
      </Card>
    </Box>
  );
};
export default Login;
