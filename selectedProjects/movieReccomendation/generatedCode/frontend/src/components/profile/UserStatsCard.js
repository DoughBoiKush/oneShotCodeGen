import { Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
export const UserStatsCard = ({ stats }) => {return (<Card sx={{ m: 2 }}><CardContent><Typography variant="h6" gutterBottom>Your Activity</Typography><BarChart width={500} height={300} data={stats}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="value" fill="#8884d8"/></BarChart></CardContent></Card>);};