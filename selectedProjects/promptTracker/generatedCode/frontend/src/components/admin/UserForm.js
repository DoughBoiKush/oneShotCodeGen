import React from'react';import{Form}from'@rjsf/mui';import validator from'@rjsf/validator-ajv8';const schema={type:'object',required:['email','password','role'],properties:{email:{type:'string',format:'email',title:'Email'},password:{type:'string',title:'Password'},role:{type:'string',title:'Role',enum:['user','admin']}}};const UserForm=({onSubmit,initialData})=>{return(<Form schema={schema} validator={validator} formData={initialData} onSubmit={({formData})=>onSubmit(formData)}/>);};export default UserForm;