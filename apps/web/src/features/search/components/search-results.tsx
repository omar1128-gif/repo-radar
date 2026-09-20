import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { EmptyState } from '@repo-radar/ui';
import { Fragment } from 'react';

import { getErrorMessage } from '@/api/get-error-message';
import { APP_CONFIG } from '@/config/app.config';
import type { GitHubRepo, GitHubSearchResponse } from '@/types';

import { SearchResultItem } from './search-result-item';

interface SearchResultsProps {
  isIdle: boolean;
  isFetching: boolean;
  data: GitHubSearchResponse<GitHubRepo> | undefined;
  error: FetchBaseQueryError | SerializedError | undefined;
  page: number;
  pageSize: number;
  onRetry: () => void;
  renderRepoActions: (repo: GitHubRepo) => React.ReactNode;
}

export function SearchResults({
  isIdle,
  isFetching,
  data,
  error,
  page,
  pageSize,
  onRetry,
  renderRepoActions,
}: SearchResultsProps) {
  if (isIdle) {
    return (
      <EmptyState
        icon={<ManageSearchIcon />}
        title="Search GitHub repositories"
        description={`Type at least ${APP_CONFIG.search.minQueryLength} characters to start searching.`}
      />
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={onRetry}>
            Retry
          </Button>
        }
      >
        {getErrorMessage(error)}
      </Alert>
    );
  }

  if (!data) return <SearchResultsSkeleton />;

  if (data.items.length === 0) {
    return (
      <EmptyState
        icon={<SearchOffIcon />}
        title="No repositories found"
        description="Try a different name or keyword."
      />
    );
  }

  const effectiveTotalResults = Math.min(
    data.total_count,
    APP_CONFIG.search.maxSearchResults
  );

  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(startItem + pageSize - 1, effectiveTotalResults);

  return (
    <Stack
      spacing={1}
      aria-busy={isFetching}
      sx={{ opacity: isFetching ? 0.6 : 1, transition: 'opacity 150ms' }}
    >
      <Typography variant="body2" color="text.secondary">
        Showing {startItem} - {endItem} of{' '}
        {effectiveTotalResults.toLocaleString()} repositories
      </Typography>
      <Paper component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
        {data.items.map((repo, index) => (
          <Fragment key={repo.id}>
            {index > 0 && <Divider component="li" aria-hidden />}
            <SearchResultItem
              repo={repo}
              renderRepoActions={renderRepoActions}
            />
          </Fragment>
        ))}
      </Paper>
    </Stack>
  );
}

function SearchResultsSkeleton() {
  return (
    <Paper aria-busy aria-label="Loading results">
      {Array.from({ length: APP_CONFIG.ui.skeletonRows }).map((_, index) => (
        <Stack key={index} direction="row" spacing={2} sx={{ p: 2 }}>
          <Skeleton variant="rounded" width={40} height={40} />
          <Stack sx={{ flex: 1 }}>
            <Skeleton width="40%" />
            <Skeleton width="80%" />
          </Stack>
        </Stack>
      ))}
    </Paper>
  );
}
