import React from'react';import Form from'@rjsf/mui';import validator from'@rjsf/validator-ajv8';const schema={type:'object',required:['candidateName','position','status'],properties:{candidateName:{type:'string',title:'Candidate Name'},position:{type:'string',title:'Position'},status:{type:'string',title:'Status',enum:['new','review','interview','offer','rejected']},email:{type:'string',format:'email',title:'Email'},phone:{type:'string',title:'Phone'},notes:{type:'string',title:'Notes'}}};export default function ApplicationForm({onSubmit,initialData}){return(<Form schema={schema}validator={validator}formData={initialData}onSubmit={({formData})=>onSubmit(formData)}/>);}