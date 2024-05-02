import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  
  palette: {
    primary: {
      main: '#396a88',
      light: '#71a0bd'
    },
    secondary: {
      main: '#7064ae',
      light: '#af9ad4'
    },
    background: {
      paper: 'rgba(255, 255, 255, 0.6)',
      default: '#eeeeee',
    },
    info: {
      main: '#293956',
      light: '#74808c'
    },
  },
  typography: {
    fontFamily: 'Lato, sans-serif',
  },
});

export default theme;
