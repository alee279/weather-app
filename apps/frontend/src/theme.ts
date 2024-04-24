// import { createTheme } from '@material-ui/core/styles'

// export const theme = createTheme({
//   palette: {
//     type: 'light',
//     primary: {
//       main: '#396a88',
//       light: '#c5dae7'
//     },
//     secondary: {
//       main: '#7064ae',
//       light: '#af9ad4'
//     },
//     background: {
//       default: '#eeeeee',
//       paper: '#fafafa',
//     },
//     info: {
//       main: '#293956',
//       light: '#74808c'
//     },
//   }
// });

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#396a88',
      light: '#c5dae7'
    },
    secondary: {
      main: '#7064ae',
      light: '#af9ad4'
    },
    background: {
      default: '#eeeeee',
      paper: '#fafafa',
    },
    info: {
      main: '#293956',
      light: '#74808c'
    },
  },
});

export default theme