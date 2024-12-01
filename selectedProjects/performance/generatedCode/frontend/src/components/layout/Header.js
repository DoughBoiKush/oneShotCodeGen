import React,{useState}from'react';import{AppBar,Toolbar,Typography,Button,IconButton,Menu,MenuItem,Avatar}from'@mui/material';import{useNavigate}from'react-router-dom';import{useAuth}from'../../context/AuthContext';const Header=({title,menuItems})=>{const navigate=useNavigate();const{user,logout}=useAuth();const[anchorEl,setAnchorEl]=useState(null);const handleMenu=(event)=>setAnchorEl(event.currentTarget);const handleClose=()=>setAnchorEl(null);const handleLogout=()=>{logout();navigate('/login');handleClose()};return(<AppBar position='static'><Toolbar><Typography variant='h6'component='div'sx={{flexGrow:1}}>{title}</Typography>{menuItems?.map((item)=>(<Button key={item.path}color='inherit'onClick={()=>navigate(item.path)}>{item.label}</Button>))}{user&&(<><IconButton onClick={handleMenu}size='large'><Avatar sx={{bgcolor:'secondary.main'}}>{user.name[0]}</Avatar></IconButton><Menu anchorEl={anchorEl}open={Boolean(anchorEl)}onClose={handleClose}><MenuItem onClick={()=>navigate('/profile')}>Profile</MenuItem><MenuItem onClick={handleLogout}>Logout</MenuItem></Menu></>)}</Toolbar></AppBar>)};export default Header;