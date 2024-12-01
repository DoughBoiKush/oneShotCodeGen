import React from'react';import{Container,Typography,Button}from'@mui/material';import{useNavigate}from'react-router-dom';export const NotFoundPage=()=>{const navigate=useNavigate();return(<Container sx={{textAlign:'center',mt:8}}><Typography variant='h1'>404</Typography><Typography variant='h5'sx={{mb:4}}>Page Not Found</Typography><Button variant='contained'onClick={()=>navigate('/')}>Go Home</Button></Container>);};export const AccessDeniedPage=()=>{const navigate=useNavigate();return(<Container sx={{textAlign:'center',mt:8}}><Typography variant='h1'>403</Typography><Typography variant='h5'sx={{mb:4}}>Access Denied</Typography><Button variant='contained'onClick={()=>navigate('/')}>Go Home</Button></Container>);};