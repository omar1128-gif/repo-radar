import { APP_CONFIG } from '@/config/app.config';

export function getTotalPages(
  totalCount: number,
  pageSize: number,
  maxResults: number = APP_CONFIG.search.maxSearchResults
): number {
  if (pageSize <= 0 || totalCount <= 0) return 0;

  const effectiveCount = Math.min(totalCount, maxResults);
  return Math.ceil(effectiveCount / pageSize);
}
