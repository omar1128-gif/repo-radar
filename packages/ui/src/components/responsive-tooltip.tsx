import {
  type Breakpoint,
  Tooltip,
  type TooltipProps,
  useMediaQuery,
  useTheme,
} from '@mui/material';

export interface ResponsiveTooltipProps extends TooltipProps {
  breakingPoint?: Breakpoint;
}

export function ResponsiveTooltip({
  children,
  breakingPoint = 'sm',
  placement,
  ...props
}: ResponsiveTooltipProps) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down(breakingPoint));

  const resolvedPlacement = placement || (isMobile ? 'top' : 'bottom');

  return (
    <Tooltip placement={resolvedPlacement} {...props}>
      {children}
    </Tooltip>
  );
}
