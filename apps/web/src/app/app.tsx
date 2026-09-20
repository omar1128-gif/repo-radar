import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';

import { useAppSelector } from '@/app/hooks';
import { AppHeader } from '@/components/app-header';
import { SearchPanel } from '@/features/search/components/search-panel';
import { TrackRepoButton } from '@/features/tracked-repos/components/track-repo-button';
import { TrackedReposPanel } from '@/features/tracked-repos/components/tracked-repos-panel';
import { selectTrackedRepoIds } from '@/features/tracked-repos/stores';

const VIEWS = {
  SEARCH: 'search',
  TRACKED: 'tracked',
} as const;

type View = (typeof VIEWS)[keyof typeof VIEWS];

export function App() {
  const [view, setView] = useState<View>(VIEWS.SEARCH);
  const [trackedViewOpened, setTrackedViewOpened] = useState(false);
  const trackedReposCount = useAppSelector(selectTrackedRepoIds).length;

  const handleViewChange = (_: React.SyntheticEvent, newView: View) => {
    setView(newView);

    if (newView === VIEWS.TRACKED) {
      setTrackedViewOpened(true);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        minWidth: 360,
        overflow: 'hidden',
      }}
    >
      <AppHeader />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
        }}
      >
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
              label={`Tracked (${trackedReposCount})`}
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
            <SearchPanel
              renderRepoActions={(repo) => <TrackRepoButton repo={repo} />}
            />
          </Box>
          {trackedViewOpened && (
            <Box
              role="tabpanel"
              id="panel-tracked"
              aria-labelledby="tab-tracked"
              hidden={view !== VIEWS.TRACKED}
            >
              <TrackedReposPanel onBrowse={() => setView(VIEWS.SEARCH)} />
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
}
