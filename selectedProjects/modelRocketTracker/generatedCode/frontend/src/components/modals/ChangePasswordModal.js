import React from'react';import{Dialog,DialogTitle,DialogContent}from'@mui/material';import{Form}from'@rjsf/mui';import validator from'@rjsf/validator-ajv8';const schema={type:'object',required:['currentPassword','newPassword'],properties:{currentPassword:{type:'string',title:'Current Password'},newPassword:{type:'string',title:'New Password'}}};const uiSchema={'ui:submitButtonOptions':{props:{variant:'contained',color:'primary'},norender:false,submitText:'Change Password'}};export const ChangePasswordModal=({open,onClose,onSubmit})=>{return(<Dialog open={open}onClose={onClose}maxWidth='sm'fullWidth><DialogTitle>Change Password</DialogTitle><DialogContent><Form schema={schema}uiSchema={uiSchema}validator={validator}onSubmit={onSubmit}/></DialogContent></Dialog>);};