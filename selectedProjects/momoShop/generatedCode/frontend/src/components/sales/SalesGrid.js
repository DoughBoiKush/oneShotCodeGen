import React from 'react';import {DataGrid} from '@mui/x-data-grid';import {Box} from '@mui/material';export const SalesGrid=({data,loading})=>{const columns=[{field:'id',headerName:'Sale ID',flex:1},{field:'total',headerName:'Total',flex:1,valueGetter:(params)=>`$${params.value}`},{field:'paymentMethod',headerName:'Payment Method',flex:1},{field:'createdAt',headerName:'Date',flex:1,valueGetter:(params)=>new Date(params.value).toLocaleDateString()}];return(<Box sx={{height:400,width:'100%'}}><DataGrid rows={data} columns={columns} loading={loading} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection disableSelectionOnClick/></Box>);};