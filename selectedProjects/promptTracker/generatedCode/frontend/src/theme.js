import{createTheme}from'@mui/material/styles';export default createTheme({palette:{primary:{main:'#1976d2'},secondary:{main:'#dc004e'}},typography:{fontFamily:['Roboto','Arial','sans-serif'].join(',')},components:{MuiButton:{styleOverrides:{root:{textTransform:'none'}}},MuiCard:{styleOverrides:{root:{borderRadius:8}}}}});