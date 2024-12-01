import React from 'react';import {useNavigate} from 'react-router-dom';import {Box,Paper,Typography} from '@mui/material';import Form from '@rjsf/mui';import validator from '@rjsf/validator-ajv8';import {useCreateEmployee} from '../../hooks/useApi';const schema={type:'object',required:['email','password','firstName','lastName'],properties:{email:{type:'string',format:'email',title:'Email'},password:{type:'string',title:'Password'},firstName:{type:'string',title:'First Name'},lastName:{type:'string',title:'Last Name'},startDate:{type:'string',format:'date',title:'Start Date'}}};const uiSchema={'ui:submitButtonOptions':{title:'Sign Up'}};export default function Signup(){const navigate=useNavigate();const createEmployee=useCreateEmployee();const handleSubmit=async({formData})=>{try{await createEmployee.mutateAsync(formData);navigate('/login')}catch(error){console.error(error)}};return(<Box sx={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'100vh'}}><Paper sx={{p:4,width:'100%',maxWidth:400}}><Typography variant='h5' sx={{mb:3}}>Create Account</Typography><Form schema={schema} uiSchema={uiSchema} validator={validator} onSubmit={handleSubmit}/></Paper></Box>);}