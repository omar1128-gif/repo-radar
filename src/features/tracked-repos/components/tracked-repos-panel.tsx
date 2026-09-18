import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { EmptyState } from '@/components/empty-state';

import { trackedReposApi } from '../api/get-repo-stats';
import { selectTrackedReposList } from '../stores';
import { TrackedRepoItem } from './tracked-repo-item';

interface TrackedReposPanelProps {
  onBrowse: () => void;
}

export function TrackedReposPanel({ onBrowse }: TrackedReposPanelProps) {
  const dispatch = useAppDispatch();
  const trackedRepos = useAppSelector(selectTrackedReposList);

  const handleRefreshAllClick = () => {
    dispatch(trackedReposApi.util.invalidateTags(['RepoStats']));
  };

  if (trackedRepos.length === 0) {
    return (
      <EmptyState
        icon={<BookmarkBorderIcon />}
        title="No tracked repositories yet"
        description="Track repositories from search to monitor their stars, issues and commits."
        action={
          <Button variant="contained" onClick={onBrowse}>
            Search repositories
          </Button>
        }
      />
    );
  }

  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Typography variant="body2" color="text.secondary">
          {trackedRepos.length} tracked{' '}
          {trackedRepos.length === 1 ? 'repository' : 'repositories'}
        </Typography>

        <Button
          variant="outlined"
          size="small"
          startIcon={<RefreshIcon />}
          onClick={handleRefreshAllClick}
        >
          Refresh all
        </Button>
      </Stack>

      <Paper component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
        {trackedRepos.map((trackedRepo, index) => (
          <Fragment key={trackedRepo.id}>
            {index > 0 && <Divider component="li" aria-hidden />}
            <TrackedRepoItem trackedRepo={trackedRepo} />
          </Fragment>
        ))}
      </Paper>
    </Stack>
  );
}
