import { Modal, Box } from '@mui/material';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { useMutation, useQueryClient } from 'react-query';
import * as api from '../../services/api';
export const AddRecommendationModal = ({ open, onClose }) => {const queryClient = useQueryClient();const { mutate } = useMutation(api.createRecommendation, {onSuccess: () => {queryClient.invalidateQueries('recommendations');onClose();}});const schema = {type: 'object',required: ['title', 'type'],properties: {title: {type: 'string',title: 'Title'},type: {type: 'string',title: 'Type',enum: ['movie', 'show']},description: {type: 'string',title: 'Description'}}};return (<Modal open={open} onClose={onClose}><Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 400,bgcolor: 'background.paper',boxShadow: 24,p: 4}}><Form schema={schema} validator={validator} onSubmit={({ formData }) => mutate(formData)}/></Box></Modal>);};