import BookmarkIcon from '@mui/icons-material/Bookmark';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import type { GitHubRepo } from '@/types/github';

dayjs.extend(relativeTime);

const compactNumber = new Intl.NumberFormat('en', { notation: 'compact' });

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
      <Stack spacing={0.5} sx={{ minWidth: 0, flex: 1 }}>
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
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
            <StarBorderIcon sx={{ fontSize: 16 }} />
            <Typography
              variant="caption"
              title={repo.stargazers_count.toLocaleString()}
            >
              {compactNumber.format(repo.stargazers_count)}
            </Typography>
          </Stack>

          {repo.language && (
            <Typography variant="caption">{repo.language}</Typography>
          )}

          {repo.open_issues_count > 0 && (
            <Typography
              variant="caption"
              title={`${repo.open_issues_count.toLocaleString()} open issues`}
            >
              {compactNumber.format(repo.open_issues_count)} issues
            </Typography>
          )}

          <Typography variant="caption">
            Updated {dayjs(repo.updated_at).fromNow()}
          </Typography>
        </Stack>
      </Stack>
      <Stack>
        <Button variant="outlined" size="small" startIcon={<BookmarkIcon />}>
          Track
        </Button>
      </Stack>
    </Stack>
  );
}
