import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <AppBar position="static">
      {" "}
      <Toolbar>
        {" "}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          Team Expense Management Portal
        </Typography>{" "}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {" "}
          <Button color="inherit" onClick={() => navigate("/dashboard")}>
            Dashboard
          </Button>{" "}
          <Button color="inherit" onClick={() => navigate("/submit-expense")}>
            Submit Expense  
          </Button>{" "}
          <Button color="inherit" onClick={() => navigate("/admin")}>
            Admin Panel
          </Button>
          <Button color="inherit" onClick={() => navigate("/profile")}>
            Profile
          </Button>{" "}
          {user?.role === "admin" && (
            <Button color="inherit" onClick={() => navigate("/admin")}>
              Admin Panel
            </Button>
          )}{" "}
          <IconButton onClick={handleMenuOpen}>
            <Avatar />
          </IconButton>{" "}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {" "}
            <MenuItem onClick={() => navigate("/profile")}>
              Profile
            </MenuItem>{" "}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>{" "}
          </Menu>{" "}
        </Box>{" "}
      </Toolbar>{" "}
    </AppBar>
  );
};
export default Header;
