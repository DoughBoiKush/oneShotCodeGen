import { createTheme } from '@mui/material';export const theme = createTheme({palette: {primary: {main: '#1976d2'},secondary: {main: '#dc004e'}},typography: {fontFamily: ['Roboto', 'sans-serif'].join(',')},components: {MuiButton: {styleOverrides: {root: {textTransform: 'none'}}}}});