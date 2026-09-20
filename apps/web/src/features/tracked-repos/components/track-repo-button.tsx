import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Button from '@mui/material/Button';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import type { GitHubRepo } from '@/types';

import { selectIsRepoTracked, trackRepo, untrackRepo } from '../stores';

interface TrackRepoButtonProps {
  repo: GitHubRepo;
}

export function TrackRepoButton({ repo }: TrackRepoButtonProps) {
  const dispatch = useAppDispatch();
  const isTracked = useAppSelector((state) =>
    selectIsRepoTracked(state, repo.id)
  );

  const handleClick = () => {
    dispatch(isTracked ? untrackRepo(repo.id) : trackRepo(repo));
  };

  return (
    <Button
      variant={isTracked ? 'outlined' : 'contained'}
      size="small"
      onClick={handleClick}
      sx={{ minWidth: 100 }}
      startIcon={isTracked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
    >
      {isTracked ? 'Untrack' : 'Track'}
    </Button>
  );
}
