import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { ContentRemovalModal } from './ContentRemovalModal';
import { LoadingState } from '../common/LoadingState';
import { useQuery } from 'react-query';
import * as api from '../../services/api';
export const ContentModerationGrid = () => {const [removalModalOpen, setRemovalModalOpen] = useState(false);const [selectedContent, setSelectedContent] = useState(null);const { data: content, isLoading } = useQuery('content', api.getContent);const columns = [{field: 'title',headerName: 'Title',flex: 1},{field: 'type',headerName: 'Type',width: 130},{field: 'User.name',headerName: 'Posted By',width: 150,valueGetter: (params) => params.row.User?.name},{field: 'actions',headerName: 'Actions',width: 130,renderCell: (params) => (<Button color="error" onClick={() => {setSelectedContent(params.row);setRemovalModalOpen(true);}}>Remove</Button>)}];if (isLoading) return <LoadingState />;return (<Box sx={{ height: 400, width: '100%' }}><DataGrid rows={content} columns={columns} pageSize={5}/>{selectedContent && <ContentRemovalModal open={removalModalOpen} onClose={() => setRemovalModalOpen(false)} content={selectedContent}/>}</Box>);};