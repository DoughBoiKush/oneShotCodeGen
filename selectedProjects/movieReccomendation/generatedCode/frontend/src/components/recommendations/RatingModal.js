import { Modal, Box } from '@mui/material';
import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import { useMutation, useQueryClient } from 'react-query';
import * as api from '../../services/api';
export const RatingModal = ({ open, onClose, recommendation }) => {const queryClient = useQueryClient();const { mutate } = useMutation(api.createRecommendation, {onSuccess: () => {queryClient.invalidateQueries('recommendations');onClose();}});const schema = {type: 'object',required: ['rating'],properties: {rating: {type: 'integer',title: 'Rating',minimum: 1,maximum: 5},review: {type: 'string',title: 'Review'}}};return (<Modal open={open} onClose={onClose}><Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 400,bgcolor: 'background.paper',boxShadow: 24,p: 4}}><Form schema={schema} validator={validator} onSubmit={({ formData }) => mutate({ ...formData, recommendationId: recommendation.id })}/></Box></Modal>);};