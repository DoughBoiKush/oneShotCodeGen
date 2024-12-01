import { Modal, Box } from '@mui/material';import Form from '@rjsf/mui';import { RJSFSchema } from '@rjsf/utils';import validator from '@rjsf/validator-ajv8';const schema = {type: 'object',required: ['startDate', 'endDate', 'type', 'reason'],properties: {startDate: {type: 'string',format: 'date',title: 'Start Date'},endDate: {type: 'string',format: 'date',title: 'End Date'},type: {type: 'string',title: 'Leave Type',enum: ['annual', 'sick', 'personal']},reason: {type: 'string',title: 'Reason'}}};export const LeaveRequestModal = ({ open, onClose, onSubmit }) => {return (<Modal open={open} onClose={onClose}><Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 400,bgcolor: 'background.paper',boxShadow: 24,p: 4,borderRadius: 2}}><Form schema={schema} validator={validator} onSubmit={({formData}) => onSubmit(formData)}/></Box></Modal>);};