import { Box } from '@mui/material';import Form from '@rjsf/mui';import validator from '@rjsf/validator-ajv8';const schema = {type: 'object',required: ['name', 'email'],properties: {name: {type: 'string',title: 'Name'},email: {type: 'string',format: 'email',title: 'Email'}}};export const UserProfileForm = ({ userData, onSubmit }) => {return (<Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}><Form schema={schema} validator={validator} formData={userData} onSubmit={({ formData }) => onSubmit(formData)}/></Box>);};