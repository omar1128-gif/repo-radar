import BugReportIcon from '@mui/icons-material/BugReport';
import PublishIcon from '@mui/icons-material/Publish';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { RepoStat } from '@repo-radar/ui';
import dayjs from 'dayjs';

import type { GitHubRepo } from '@/types';
import { formatCompactNumber, formatNumber } from '@/utils/format-number';

interface SearchResultItemProps {
  repo: GitHubRepo;
  renderRepoActions: (repo: GitHubRepo) => React.ReactNode;
}

export function SearchResultItem({
  repo,
  renderRepoActions,
}: SearchResultItemProps) {
  return (
    <Stack
      component="li"
      direction="row"
      spacing={3}
      sx={{ p: 2, alignItems: 'flex-start' }}
    >
      <Avatar
        src={repo.owner.avatar_url}
        alt=""
        variant="rounded"
        sx={{ width: 40, height: 40 }}
      />

      <Stack spacing={1} sx={{ minWidth: 0, flex: 1 }}>
        <Link
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          color="text.primary"
          sx={{ fontWeight: 500, overflowWrap: 'anywhere' }}
        >
          {repo.full_name}
        </Link>

        {repo.description ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
            }}
          >
            {repo.description}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No available description
          </Typography>
        )}

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
            value={formatCompactNumber(repo.stargazers_count)}
            tooltip={`${formatNumber(repo.stargazers_count)} stars`}
          />

          <RepoStat
            icon={<BugReportIcon />}
            value={formatCompactNumber(repo.open_issues_count)}
            tooltip={`${formatNumber(repo.open_issues_count)} open issues and pull requests`}
          />

          {repo.language && (
            <Typography variant="caption">{repo.language}</Typography>
          )}

          <RepoStat
            icon={<PublishIcon />}
            value={`Pushed ${dayjs(repo.pushed_at).fromNow()}`}
            tooltip={`Last push to any branch: ${dayjs(repo.pushed_at).format('MMM D, YYYY · HH:mm')}`}
          />
        </Stack>
      </Stack>

      {renderRepoActions(repo)}
    </Stack>
  );
}
