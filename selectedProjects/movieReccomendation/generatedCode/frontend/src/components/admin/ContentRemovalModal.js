import { Modal, Box } from '@mui/material';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { useMutation, useQueryClient } from 'react-query';
import * as api from '../../services/api';
export const ContentRemovalModal = ({ open, onClose, content }) => {const queryClient = useQueryClient();const { mutate } = useMutation(api.removeContent, {onSuccess: () => {queryClient.invalidateQueries('content');onClose();}});const schema = {type: 'object',required: ['reason'],properties: {reason: {type: 'string',title: 'Removal Reason'}}};return (<Modal open={open} onClose={onClose}><Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 400,bgcolor: 'background.paper',boxShadow: 24,p: 4}}><Form schema={schema} validator={validator} onSubmit={({ formData }) => mutate({ id: content.id, ...formData })}/></Box></Modal>);};