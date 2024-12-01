import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Alert } from '@mui/material';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { useAuth } from '../../hooks/useAuth';
import * as api from '../../services/api';
export const SignupForm = () => {const navigate = useNavigate();const { login } = useAuth();const [error, setError] = useState('');const schema = {type: 'object',required: ['email', 'password', 'name'],properties: {email: {type: 'string',format: 'email',title: 'Email'},password: {type: 'string',title: 'Password'},name: {type: 'string',title: 'Name'}}};const uiSchema = {password: {'ui:widget': 'password'}};const handleSubmit = async ({ formData }) => {try {const data = await api.register(formData);login(data);navigate('/');} catch (err) {setError(err.response?.data?.error || 'Registration failed');}};return (<Box sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}<Form schema={schema} uiSchema={uiSchema} validator={validator} onSubmit={handleSubmit}/>}</Box>);};