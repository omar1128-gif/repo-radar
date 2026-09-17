import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Button from '@mui/material/Button';

import { EmptyState } from '@/components/empty-state';

interface TrackedReposPanelProps {
  onBrowse: () => void;
}

export function TrackedReposPanel({ onBrowse }: TrackedReposPanelProps) {
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
