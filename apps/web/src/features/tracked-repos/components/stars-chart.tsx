import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { BarChart } from '@repo-radar/plots';
import { shallowEqual } from 'react-redux';

import { useAppSelector } from '@/app/hooks';
import { formatCompactNumber, formatNumber } from '@/utils/format-number';

import { trackedReposApi } from '../api/get-repo-stats';
import { selectTrackedReposList } from '../stores';

const BAR_HEIGHT = 36;
const CHART_PADDING = 64;

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

  const chartData = trackedRepos
    .map((trackedRepo, index) => ({
      label: trackedRepo.full_name,
      value: stars[index],
    }))
    .filter(
      (entry): entry is { label: string; value: number } => entry.value !== null
    )
    .sort((a, b) => b.value - a.value);

  const calculatedHeight = chartData.length * BAR_HEIGHT + CHART_PADDING;

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={1}>
        <Typography variant="subtitle2" component="h2">
          Stars per repository
        </Typography>

        {chartData.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Waiting for repository stats.
          </Typography>
        ) : (
          <BarChart
            data={chartData}
            height={calculatedHeight}
            seriesLabel="Stars"
            xValueFormatter={(val) => formatCompactNumber(val)}
            yValueFormatter={(val) => formatNumber(val)}
          />
        )}
      </Stack>
    </Paper>
  );
}
