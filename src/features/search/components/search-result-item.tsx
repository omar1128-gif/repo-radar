import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

import type { GitHubRepo } from '@/types/github';
import { formatCompactNumber, formatNumber } from '@/utils/format-number';

export function SearchResultItem({ repo }: { repo: GitHubRepo }) {
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

        {repo.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {repo.description}
          </Typography>
        )}

        <Stack
          direction="row"
          spacing={2}
          sx={{ color: 'text.secondary', alignItems: 'center' }}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Tooltip title={`${formatNumber(repo.stargazers_count)} stars`}>
            <Stack
              direction="row"
              spacing={0.5}
              sx={{ alignItems: 'center', cursor: 'pointer' }}
            >
              <StarBorderIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption">
                {formatCompactNumber(repo.stargazers_count)}
              </Typography>
            </Stack>
          </Tooltip>

          {repo.language && (
            <Typography variant="caption">{repo.language}</Typography>
          )}

          {repo.open_issues_count > 0 && (
            <Tooltip
              title={`${formatNumber(repo.open_issues_count)} open issues`}
            >
              <Typography variant="caption" sx={{ cursor: 'pointer' }}>
                {formatCompactNumber(repo.open_issues_count)} issues
              </Typography>
            </Tooltip>
          )}

          <Tooltip
            title={`Last commit: ${dayjs(repo.pushed_at).format('MMM D, YYYY · HH:mm')}`}
          >
            <Typography
              variant="caption"
              sx={{
                cursor: 'pointer',
              }}
            >
              Pushed {dayjs(repo.pushed_at).fromNow()}
            </Typography>
          </Tooltip>
        </Stack>
      </Stack>

      <Stack>
        <Button
          variant="outlined"
          size="small"
          startIcon={<BookmarkBorderIcon />}
        >
          Track
        </Button>
      </Stack>
    </Stack>
  );
}
