import React from'react';import{BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer}from'recharts';import{Paper}from'@mui/material';export default function ApplicationStatusChart({data}){return(<Paper sx={{p:2,height:300}}><ResponsiveContainer><BarChart data={data}margin={{top:5,right:30,left:20,bottom:5}}><CartesianGrid strokeDasharray='3 3'/><XAxis dataKey='name'/><YAxis/><Tooltip/><Bar dataKey='value'fill='#8884d8'/></BarChart></ResponsiveContainer></Paper>);}