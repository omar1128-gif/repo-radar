const compactFormatter = new Intl.NumberFormat('en', { notation: 'compact' });
const standardFormatter = new Intl.NumberFormat('en');

/**
 * Formats a number into a compact string (e.g., 1500 -> '1.5K').
 */
export function formatCompactNumber(value: number): string {
  return compactFormatter.format(value);
}

/**
 * Formats a number with standard comma separators (e.g., 1500 -> '1,500').
 */
export function formatNumber(value: number): string {
  return standardFormatter.format(value);
}
