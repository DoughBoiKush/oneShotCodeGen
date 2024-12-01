import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { UserEditModal } from './UserEditModal';
import { LoadingState } from '../common/LoadingState';
import { useQuery } from 'react-query';
import * as api from '../../services/api';
export const UserManagementGrid = () => {const [editModalOpen, setEditModalOpen] = useState(false);const [selectedUser, setSelectedUser] = useState(null);const { data: users, isLoading } = useQuery('users', api.getUsers);const columns = [{field: 'name',headerName: 'Name',flex: 1},{field: 'email',headerName: 'Email',flex: 1},{field: 'isAdmin',headerName: 'Admin',width: 130,type: 'boolean'},{field: 'actions',headerName: 'Actions',width: 130,renderCell: (params) => (<Button onClick={() => {setSelectedUser(params.row);setEditModalOpen(true);}}>Edit</Button>)}];if (isLoading) return <LoadingState />;return (<Box sx={{ height: 400, width: '100%' }}><DataGrid rows={users} columns={columns} pageSize={5}/>{selectedUser && <UserEditModal open={editModalOpen} onClose={() => setEditModalOpen(false)} user={selectedUser}/>}</Box>);};