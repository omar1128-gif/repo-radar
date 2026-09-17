import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';

import { AppHeader } from '@/components/app-header';
import { SearchPanel } from '@/features/search/components/search-panel';

const VIEWS = {
  SEARCH: 'search',
  TRACKED: 'tracked',
} as const;

type View = (typeof VIEWS)[keyof typeof VIEWS];

export function App() {
  const [view, setView] = useState<View>(VIEWS.SEARCH);

  const handleViewChange = (_: React.SyntheticEvent, newView: View) => {
    setView(newView);
  };

  return (
    <>
      <AppHeader />

      <Container maxWidth="md" sx={{ py: 3 }}>
        <Tabs
          value={view}
          onChange={handleViewChange}
          aria-label="Dashboard views"
          sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab
            label="Search"
            value={VIEWS.SEARCH}
            id="tab-search"
            aria-controls="panel-search"
          />
          <Tab
            label="Tracked"
            value={VIEWS.TRACKED}
            id="tab-tracked"
            aria-controls="panel-tracked"
          />
        </Tabs>

        <Box
          role="tabpanel"
          id="panel-search"
          aria-labelledby="tab-search"
          hidden={view !== VIEWS.SEARCH}
        >
          <SearchPanel />
        </Box>
        <Box
          role="tabpanel"
          id="panel-tracked"
          aria-labelledby="tab-tracked"
          hidden={view !== 'tracked'}
        ></Box>
      </Container>
    </>
  );
}
