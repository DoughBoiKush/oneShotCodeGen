import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
export const Header = ({ title, menuItems = [] }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleMenuClick = (path) => {
    navigate(path);
    handleMenuClose();
  };
  const handleLogout = () => {
    handleMenuClose();
    logout();
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {menuItems.map((item) => (
          <Button
            key={item.path}
            color="inherit"
            onClick={() => handleMenuClick(item.path)}
          >
            {item.label}
          </Button>
        ))}
        {user && (
          <>
            <IconButton onClick={handleMenuOpen}>
              <Avatar>{user.name[0]}</Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleMenuClick("/profile")}>
                Profile
              </MenuItem>
              {user.isAdmin && (
                <MenuItem onClick={() => handleMenuClick("/admin")}>
                  Admin Panel
                </MenuItem>
              )}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
