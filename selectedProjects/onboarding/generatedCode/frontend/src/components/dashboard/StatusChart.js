import React from 'react';import {PieChart,Pie,Cell,ResponsiveContainer,Legend,Tooltip} from 'recharts';import {Box,Typography} from '@mui/material';const COLORS=['#0088FE','#00C49F','#FFBB28'];export default function StatusChart({data}){return(<Box sx={{height:300,p:2}}><Typography variant='h6' gutterBottom>Onboarding Status</Typography><ResponsiveContainer><PieChart><Pie data={data} dataKey='value' nameKey='name' cx='50%' cy='50%' outerRadius={80}>{data.map((entry,index)=>(<Cell key={entry.name} fill={COLORS[index%COLORS.length]}/>))}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer></Box>);}