import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import BugReportIcon from '@mui/icons-material/BugReport';
import CommitIcon from '@mui/icons-material/Commit';
import PublishIcon from '@mui/icons-material/Publish';
import RefreshIcon from '@mui/icons-material/Refresh';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

import { getErrorMessage } from '@/api/get-error-message';
import { useAppDispatch } from '@/app/hooks';
import { RepoStat } from '@/components/repo-stat';
import { formatCompactNumber, formatNumber } from '@/utils/format-number';

import { useGetRepoStatsQuery } from '../api/get-repo-stats';
import { untrackRepo } from '../stores';
import type { TrackedRepo } from '../types';

interface TrackedRepoItemProps {
  trackedRepo: TrackedRepo;
}

export function TrackedRepoItem({ trackedRepo }: TrackedRepoItemProps) {
  const dispatch = useAppDispatch();
  const { data, error, isLoading, isFetching, refetch } = useGetRepoStatsQuery(
    trackedRepo.full_name
  );

  const lastCommit = data?.lastCommit;
  const lastCommitDate =
    lastCommit?.commit.committer?.date ?? lastCommit?.commit.author?.date;

  return (
    <Stack
      component="li"
      direction="row"
      spacing={3}
      sx={{ p: 2, alignItems: 'flex-start' }}
    >
      {data ? (
        <Avatar
          src={data.owner.avatar_url}
          alt=""
          variant="rounded"
          sx={{ width: 40, height: 40 }}
        />
      ) : (
        <Skeleton variant="rounded" width={40} height={40} />
      )}

      <Stack spacing={1} sx={{ minWidth: 0, flex: 1 }}>
        {data ? (
          <Link
            href={data.html_url}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            color="text.primary"
            sx={{ fontWeight: 500, overflowWrap: 'anywhere' }}
          >
            {trackedRepo.full_name}
          </Link>
        ) : (
          <Typography sx={{ fontWeight: 500, overflowWrap: 'anywhere' }}>
            {trackedRepo.full_name}
          </Typography>
        )}

        {error && (
          <Alert
            severity={data ? 'warning' : 'error'}
            action={
              data ? undefined : (
                <Button color="inherit" size="small" onClick={() => refetch()}>
                  Retry
                </Button>
              )
            }
          >
            {data && 'Could not refresh. '}
            {getErrorMessage(error)}
          </Alert>
        )}

        {isLoading && <Skeleton width="60%" />}

        {data?.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
            }}
          >
            {data.description}
          </Typography>
        )}

        {isLoading ? (
          <Skeleton width="40%" />
        ) : (
          data && (
            <Stack
              direction={{
                xs: 'column',
                sm: 'row',
              }}
              spacing={{ xs: 0.1, sm: 2 }}
              sx={{
                color: 'text.secondary',
                alignItems: {
                  xs: 'start',
                  sm: 'center',
                },
              }}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <RepoStat
                icon={<StarBorderIcon />}
                value={formatCompactNumber(data.stargazers_count)}
                tooltip={`${formatNumber(data.stargazers_count)} stars`}
              />

              <RepoStat
                icon={<BugReportIcon />}
                value={formatCompactNumber(data.open_issues_count)}
                tooltip={`${formatNumber(data.open_issues_count)} open issues and pull requests`}
              />

              <RepoStat
                icon={<CommitIcon />}
                value={
                  lastCommitDate
                    ? `Committed ${dayjs(lastCommitDate).fromNow()}`
                    : 'No commits'
                }
                tooltip={
                  lastCommitDate
                    ? `Last commit on the default branch: ${dayjs(lastCommitDate).format('MMM D, YYYY · HH:mm')}`
                    : 'This repository has no commits yet'
                }
              />

              <RepoStat
                icon={<PublishIcon />}
                value={`Pushed ${dayjs(data.pushed_at).fromNow()}`}
                tooltip={`Last push to any branch: ${dayjs(data.pushed_at).format('MMM D, YYYY · HH:mm')}`}
              />
            </Stack>
          )
        )}
      </Stack>

      <Stack direction="row" spacing={0.5}>
        <Tooltip title="Refresh">
          <span>
            <IconButton
              size="small"
              onClick={() => refetch()}
              disabled={isFetching}
              aria-label={`Refresh ${trackedRepo.full_name}`}
            >
              {isFetching ? (
                <CircularProgress size={18} />
              ) : (
                <RefreshIcon fontSize="small" />
              )}
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Untrack">
          <IconButton
            size="small"
            onClick={() => dispatch(untrackRepo(trackedRepo.id))}
            aria-label={`Untrack ${trackedRepo.full_name}`}
          >
            <BookmarkRemoveIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
