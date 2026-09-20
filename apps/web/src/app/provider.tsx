import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@repo-radar/ui';
import type { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from './store';

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
}
