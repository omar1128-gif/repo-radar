import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <Stack
      spacing={1}
      sx={{ alignItems: 'center', textAlign: 'center', py: 8, px: 2 }}
    >
      <Stack sx={{ color: 'text.secondary', '& svg': { fontSize: 40 } }}>
        {icon}
      </Stack>
      <Typography variant="subtitle1" component="p" sx={{ fontWeight: 500 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      )}
      {action && <Stack sx={{ pt: 1 }}>{action}</Stack>}
    </Stack>
  );
}
