import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@repo-radar/ui';
import { render } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';

import type { RootState } from '@/app/store';
import { setupStore } from '@/app/store';

interface RenderOptions {
  preloadedState?: Partial<RootState>;
}

export function renderWithProviders(
  ui: ReactElement,
  { preloadedState }: RenderOptions = {}
) {
  const store = setupStore(preloadedState);

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper }) };
}
