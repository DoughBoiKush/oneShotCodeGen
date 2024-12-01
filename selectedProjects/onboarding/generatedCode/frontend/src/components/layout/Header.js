import React,{useState} from 'react';import {AppBar,Toolbar,Typography,IconButton,Menu,MenuItem,Avatar,Box} from '@mui/material';import {useNavigate} from 'react-router-dom';import {useAuth} from '../../context/AuthContext';export default function Header({title,links=[]}){const navigate=useNavigate();const {user,logout}=useAuth();const [anchorEl,setAnchorEl]=useState(null);const handleMenu=(event)=>setAnchorEl(event.currentTarget);const handleClose=()=>setAnchorEl(null);const handleLogout=()=>{logout();navigate('/login');handleClose()};return(<AppBar position='static'><Toolbar><Typography variant='h6' component='div' sx={{flexGrow:1}}>{title}</Typography>{links.map((link)=>(<Typography key={link.path} sx={{mx:2,cursor:'pointer'}} onClick={()=>navigate(link.path)}>{link.label}</Typography>))}{user&&(<Box><IconButton onClick={handleMenu}><Avatar/></IconButton><Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}><MenuItem onClick={()=>navigate('/profile')}>Profile</MenuItem><MenuItem onClick={handleLogout}>Logout</MenuItem></Menu></Box>)}</Toolbar></AppBar>);}