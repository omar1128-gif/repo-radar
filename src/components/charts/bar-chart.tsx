import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart';

export interface BarChartItem {
  label: string;
  value: number;
}

export interface BarChartProps {
  data: BarChartItem[];
  height?: number;
  seriesLabel?: string;
  xValueFormatter?: (value: number) => string;
  yValueFormatter?: (value: number) => string;
}

export function BarChart({
  data,
  height = 300,
  seriesLabel = 'Value',
  xValueFormatter,
  yValueFormatter,
}: BarChartProps) {
  return (
    <MuiBarChart
      layout="horizontal"
      height={height}
      hideLegend
      grid={{ vertical: true }}
      series={[
        {
          data: data.map((entry) => entry.value),
          label: seriesLabel,
          valueFormatter: (value: number | null) =>
            value === null
              ? ''
              : yValueFormatter
                ? yValueFormatter(value)
                : String(value),
        },
      ]}
      yAxis={[
        {
          scaleType: 'band',
          data: data.map((entry) => entry.label),
          width: 'auto',
        },
      ]}
      xAxis={[
        {
          valueFormatter: (value: number) =>
            xValueFormatter ? xValueFormatter(value) : String(value),
        },
      ]}
    />
  );
}
