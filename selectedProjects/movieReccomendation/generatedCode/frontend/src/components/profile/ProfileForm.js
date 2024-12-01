import { Box } from '@mui/material';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { useMutation } from 'react-query';
import { useAuth } from '../../hooks/useAuth';
import * as api from '../../services/api';
export const ProfileForm = () => {const { user, login } = useAuth();const { mutate } = useMutation(api.updateProfile, {onSuccess: (data) => login(data)});const schema = {type: 'object',required: ['name', 'email'],properties: {name: {type: 'string',title: 'Name'},email: {type: 'string',format: 'email',title: 'Email'}}};return (<Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}><Form schema={schema} validator={validator} formData={user} onSubmit={({ formData }) => mutate(formData)}/></Box>);};