import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      console.log(data);
      loginUser(data);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setError("Invalid credentials");
    }
  };
  return (
    <Box sx={{ maxWidth: 400, mx: "auto", p: 3, mt: 5, boxShadow: 3 }}>
      {" "}
      <Typography variant="h4" mb={2}>
        Login
      </Typography>{" "}
      <Stack spacing={2}>
        {" "}
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        {error && <Typography color="error">{error}</Typography>}{" "}
        <Button variant="contained" onClick={handleSubmit}>
          Login
        </Button>{" "}
      </Stack>{" "}
    </Box>
  );
};
export default Login;
