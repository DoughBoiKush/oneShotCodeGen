import React from'react';import{Card,CardContent,Typography}from'@mui/material';import{PieChart,Pie,Cell,ResponsiveContainer,Legend,Tooltip}from'recharts';const COLORS=['#0088FE','#00C49F','#FFBB28'];export const ProgressChart=({data})=>{return(<Card sx={{mt:3,height:400}}><CardContent><Typography variant='h6'gutterBottom>Project Progress Overview</Typography><ResponsiveContainer width='100%'height='100%'><PieChart><Pie data={data}cx='50%'cy='50%'innerRadius={60}outerRadius={80}fill='#8884d8'paddingAngle={5}dataKey='value'>{data.map((entry,index)=>(<Cell key={`cell-${index}`}fill={COLORS[index%COLORS.length]}/>))}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer></CardContent></Card>);};