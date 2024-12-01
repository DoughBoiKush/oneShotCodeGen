import React from'react';import{Container}from'@mui/material';import{Header}from'../components/layout/Header';import{UserManagementTable}from'../components/admin/UserManagementTable';import{SystemMetricsCards}from'../components/admin/SystemMetricsCards';import{useQuery}from'@tanstack/react-query';import{LoadingState}from'../components/common/LoadingState';export const AdminPage=()=>{const{data:users,isLoading}=useQuery(['users'],()=>Promise.resolve([]));if(isLoading)return<LoadingState/>;const metrics=[{label:'Total Users',value:users?.length||0},{label:'Active Projects',value:0},{label:'Completed Projects',value:0}];const menuItems=[{label:'Dashboard',path:'/dashboard'},{label:'Admin',path:'/admin'}];return(<><Header title='Admin Panel'menuItems={menuItems}/><Container sx={{mt:4}}><SystemMetricsCards metrics={metrics}/><UserManagementTable users={users||[]}/></Container></>);};