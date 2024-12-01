import React from 'react';import Form from '@rjsf/mui';import validator from '@rjsf/validator-ajv8';const schema={type:'object',required:['title','dueDate'],properties:{title:{type:'string',title:'Title'},description:{type:'string',title:'Description'},dueDate:{type:'string',format:'date',title:'Due Date'},status:{type:'string',title:'Status',enum:['pending','in_progress','completed']}}};export default function TaskForm({onSubmit}){return <Form schema={schema} validator={validator} onSubmit={onSubmit}/>;}