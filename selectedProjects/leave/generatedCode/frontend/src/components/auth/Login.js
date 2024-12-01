import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { login } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
export const Login = () => {
  const { login: authLogin } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      authLogin(response);
    } catch (error) {
      console.error("Login failed:", error);
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
            sx={{ mb: 2, textAlign: "center" }}
            fontWeight="bold"
          >
            Employee Leave Management System
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              margin="normal"
            />
            <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
