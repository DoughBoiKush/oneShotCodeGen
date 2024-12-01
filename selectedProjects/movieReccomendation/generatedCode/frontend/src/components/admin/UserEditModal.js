import { Modal, Box } from '@mui/material';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { useMutation, useQueryClient } from 'react-query';
import * as api from '../../services/api';
export const UserEditModal = ({ open, onClose, user }) => {const queryClient = useQueryClient();const { mutate } = useMutation(api.updateUser, {onSuccess: () => {queryClient.invalidateQueries('users');onClose();}});const schema = {type: 'object',required: ['name', 'email'],properties: {name: {type: 'string',title: 'Name'},email: {type: 'string',format: 'email',title: 'Email'},isAdmin: {type: 'boolean',title: 'Admin Status'}}};return (<Modal open={open} onClose={onClose}><Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 400,bgcolor: 'background.paper',boxShadow: 24,p: 4}}><Form schema={schema} validator={validator} formData={user} onSubmit={({ formData }) => mutate(formData)}/></Box></Modal>);};