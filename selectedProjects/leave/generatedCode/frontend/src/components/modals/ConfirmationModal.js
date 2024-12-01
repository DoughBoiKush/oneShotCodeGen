import { Modal, Box, Typography, Button } from '@mui/material';export const ConfirmationModal = ({ open, onClose, onConfirm, title, message }) => {return (<Modal open={open} onClose={onClose}><Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 400,bgcolor: 'background.paper',boxShadow: 24,p: 4,borderRadius: 2}}><Typography variant='h6' component='h2'>{title}</Typography><Typography sx={{ mt: 2 }}>{message}</Typography><Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}><Button onClick={onClose} sx={{ mr: 1 }}>Cancel</Button><Button variant='contained' onClick={onConfirm} color='primary'>Confirm</Button></Box></Box></Modal>);};