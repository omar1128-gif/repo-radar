import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#1f2328' },
        background: { default: '#f6f8fa', paper: '#ffffff' },
      },
    },
    dark: {
      palette: {
        primary: { main: '#f0f6fc' },
        background: { default: '#0d1117', paper: '#161b22' },
      },
    },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: 'Roboto, system-ui, sans-serif',
    button: { textTransform: 'none', fontWeight: 500 },
  },
  components: {
    MuiAppBar: {
      defaultProps: { elevation: 0, color: 'inherit' },
      styleOverrides: {
        root: {
          borderBottom: '1px solid var(--mui-palette-divider)',
        },
      },
    },
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiCard: { defaultProps: { variant: 'outlined' } },
    MuiPaper: { defaultProps: { variant: 'outlined' } },
    MuiTab: { styleOverrides: { root: { textTransform: 'none' } } },
  },
});
