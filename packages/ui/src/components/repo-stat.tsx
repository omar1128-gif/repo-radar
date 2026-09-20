import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

import { ResponsiveTooltip } from './responsive-tooltip';

interface RepoStatProps {
  icon: ReactNode;
  value: string;
  tooltip: string;
}

export function RepoStat({ icon, value, tooltip }: RepoStatProps) {
  return (
    <ResponsiveTooltip title={tooltip}>
      <Stack
        direction="row"
        spacing={0.5}
        sx={{
          alignItems: 'center',
          cursor: 'default',
          '& svg': { fontSize: 16, display: 'block' },
        }}
      >
        {icon}
        <Typography
          variant="caption"
          sx={{
            lineHeight: 1,
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          {value}
        </Typography>
      </Stack>
    </ResponsiveTooltip>
  );
}
