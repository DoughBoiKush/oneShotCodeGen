# Frontend Code2

{
"files":{
"frontend/src/components/metrics/MetricsCard.js":"import React from 'react';import{Card,CardContent,Typography}from'@mui/material';const MetricsCard=({title,value})=>{return(<Card sx={{minWidth:200,m:1}}><CardContent><Typography variant='h6' gutterBottom>{title}</Typography><Typography variant='h4'>{value}</Typography></CardContent></Card>);};export default MetricsCard;",
"frontend/src/components/prompts/PromptGrid.js":"import React from'react';import{DataGrid}from'@mui/x-data-grid';import{IconButton}from'@mui/material';import{Edit,Delete}from'@mui/icons-material';const columns=[{field:'title',headerName:'Title',flex:1},{field:'content',headerName:'Content',flex:2},{field:'averageRating',headerName:'Rating',flex:1,valueGetter:(params)=>params.value?.toFixed(1)||'N/A'},{field:'actions',headerName:'Actions',flex:1,renderCell:(params)=>(<><IconButton onClick={()=>params.row.onEdit(params.row)}><Edit/></IconButton><IconButton onClick={()=>params.row.onDelete(params.row)}><Delete/></IconButton></>)}];const PromptGrid=({prompts,onEdit,onDelete})=>{const rows=prompts?.map(prompt=>({...prompt,onEdit,onDelete}))||[];return(<DataGrid rows={rows} columns={columns} autoHeight pageSize={5}/>);};export default PromptGrid;",
"frontend/src/components/prompts/PromptForm.js":"import React from'react';import{Form}from'@rjsf/mui';import validator from'@rjsf/validator-ajv8';const schema={type:'object',required:['title','content'],properties:{title:{type:'string',title:'Title'},content:{type:'string',title:'Content'}}};const PromptForm=({onSubmit,initialData})=>{return(<Form schema={schema} validator={validator} formData={initialData} onSubmit={({formData})=>onSubmit(formData)}/>);};export default PromptForm;",
"frontend/src/components/chains/ChainGrid.js":"import React from'react';import{DataGrid}from'@mui/x-data-grid';import{IconButton}from'@mui/material';import{Edit,Delete}from'@mui/icons-material';const columns=[{field:'name',headerName:'Name',flex:1},{field:'description',headerName:'Description',flex:2},{field:'actions',headerName:'Actions',flex:1,renderCell:(params)=>(<><IconButton onClick={()=>params.row.onEdit(params.row)}><Edit/></IconButton><IconButton onClick={()=>params.row.onDelete(params.row)}><Delete/></IconButton></>)}];const ChainGrid=({chains,onEdit,onDelete})=>{const rows=chains?.map(chain=>({...chain,onEdit,onDelete}))||[];return(<DataGrid rows={rows} columns={columns} autoHeight pageSize={5}/>);};export default ChainGrid;",
"frontend/src/components/chains/ChainForm.js":"import React from'react';import{Form}from'@rjsf/mui';import validator from'@rjsf/validator-ajv8';const schema={type:'object',required:['name'],properties:{name:{type:'string',title:'Name'},description:{type:'string',title:'Description'}}};const ChainForm=({onSubmit,initialData})=>{return(<Form schema={schema} validator={validator} formData={initialData} onSubmit={({formData})=>onSubmit(formData)}/>);};export default ChainForm;",
"frontend/src/components/admin/UserGrid.js":"import React from'react';import{DataGrid}from'@mui/x-data-grid';import{IconButton}from'@mui/material';import{Edit,Delete}from'@mui/icons-material';const columns=[{field:'email',headerName:'Email',flex:1},{field:'role',headerName:'Role',flex:1},{field:'actions',headerName:'Actions',flex:1,renderCell:(params)=>(<><IconButton onClick={()=>params.row.onEdit(params.row)}><Edit/></IconButton><IconButton onClick={()=>params.row.onDelete(params.row)}><Delete/></IconButton></>)}];const UserGrid=({users,onEdit,onDelete})=>{const rows=users?.map(user=>({...user,onEdit,onDelete}))||[];return(<DataGrid rows={rows} columns={columns} autoHeight pageSize={5}/>);};export default UserGrid;",
"frontend/src/components/admin/UserForm.js":"import React from'react';import{Form}from'@rjsf/mui';import validator from'@rjsf/validator-ajv8';const schema={type:'object',required:['email','password','role'],properties:{email:{type:'string',format:'email',title:'Email'},password:{type:'string',title:'Password'},role:{type:'string',title:'Role',enum:['user','admin']}}};const UserForm=({onSubmit,initialData})=>{return(<Form schema={schema} validator={validator} formData={initialData} onSubmit={({formData})=>onSubmit(formData)}/>);};export default UserForm;",
"frontend/src/components/common/LoadingState.js":"import React from'react';import{Skeleton,Stack}from'@mui/material';const LoadingState=()=>{return(<Stack spacing={1}><Skeleton variant='rectangular' height={60}/><Skeleton variant='rectangular' height={400}/></Stack>);};export default LoadingState;",
"frontend/src/components/common/ErrorBoundary.js":"import React from'react';import{Box,Typography,Button}from'@mui/material';class ErrorBoundary extends React.Component{constructor(props){super(props);this.state={hasError:false};}static getDerivedStateFromError(error){return{hasError:true};}render(){if(this.state.hasError){return(<Box sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh'}}><Typography variant='h4' gutterBottom>Something went wrong</Typography><Button variant='contained' onClick={()=>window.location.reload()}>Reload Page</Button></Box>);}return this.props.children;}}export default ErrorBoundary;"
},
"commands":["cd frontend && npm install @mui/icons-material","cd frontend && npm install recharts"]
}