import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
export const Header = ({ title, menuItems = [] }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  console.log(user);
  const handleMenuClick = (path) => {
    handleClose();
    navigate(path);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {user && (
          <>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {menuItems.map((item) => (
                <MenuItem
                  key={item.path}
                  onClick={() => handleMenuClick(item.path)}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Box>
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar sx={{ width: 32, height: 32 }}>{user.name[0]}</Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleMenuClick("/profile")}>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
