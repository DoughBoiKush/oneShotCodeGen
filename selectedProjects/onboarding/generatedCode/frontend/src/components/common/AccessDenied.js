import React from 'react';import {Box,Typography,Button} from '@mui/material';import {useNavigate} from 'react-router-dom';export default function AccessDenied(){const navigate=useNavigate();return(<Box sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh'}}><Typography variant='h4'>Access Denied</Typography><Button variant='contained' onClick={()=>navigate('/')}>Go Home</Button></Box>);}