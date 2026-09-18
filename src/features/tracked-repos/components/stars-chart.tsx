import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { shallowEqual } from 'react-redux';

import { useAppSelector } from '@/app/hooks';
import { formatCompactNumber, formatNumber } from '@/utils/format-number';

import { trackedReposApi } from '../api/get-repo-stats';
import { selectTrackedReposList } from '../stores';

const BAR_HEIGHT = 36;
const CHART_PADDING = 64;

interface StarsChartEntry {
  fullName: string;
  stars: number;
}

export function StarsChart() {
  const trackedRepos = useAppSelector(selectTrackedReposList);

  const stars = useAppSelector(
    (state) =>
      trackedRepos.map(
        (trackedRepo) =>
          trackedReposApi.endpoints.getRepoStats.select(trackedRepo.full_name)(
            state
          ).data?.stargazers_count ?? null
      ),
    shallowEqual
  );

  const entries = trackedRepos
    .map((trackedRepo, index) => ({
      fullName: trackedRepo.full_name,
      stars: stars[index],
    }))
    .filter((entry): entry is StarsChartEntry => entry.stars !== null)
    .sort((a, b) => b.stars - a.stars);

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={1}>
        <Typography variant="subtitle2" component="h2">
          Stars per repository
        </Typography>

        {entries.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Waiting for repository stats.
          </Typography>
        ) : (
          <BarChart
            layout="horizontal"
            height={entries.length * BAR_HEIGHT + CHART_PADDING}
            hideLegend
            grid={{ vertical: true }}
            series={[
              {
                data: entries.map((entry) => entry.stars),
                label: 'Stars',
                valueFormatter: (value) => formatNumber(value ?? 0),
              },
            ]}
            yAxis={[
              {
                scaleType: 'band',
                data: entries.map((entry) => entry.fullName),
                width: 'auto',
              },
            ]}
            xAxis={[
              {
                valueFormatter: (value: number) => formatCompactNumber(value),
              },
            ]}
          />
        )}
      </Stack>
    </Paper>
  );
}
