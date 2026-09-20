import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import type { GitHubErrorBody } from '@/types';

function isGitHubErrorBody(data: unknown): data is GitHubErrorBody {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof (data as GitHubErrorBody).message === 'string'
  );
}

export function getErrorMessage(
  error: FetchBaseQueryError | SerializedError | undefined
): string {
  if (!error) return 'Something went wrong.';

  if (!('status' in error)) return error.message ?? 'Something went wrong.';

  switch (error.status) {
    case 'FETCH_ERROR':
      return 'Network error. Check your connection and try again.';
    case 'PARSING_ERROR':
    case 'TIMEOUT_ERROR':
    case 'CUSTOM_ERROR':
      return error.error;
  }

  const githubMessage = isGitHubErrorBody(error.data)
    ? error.data.message
    : undefined;

  if (
    error.status === 429 ||
    (error.status === 403 && /rate limit/i.test(githubMessage ?? ''))
  ) {
    return 'GitHub rate limit reached. Wait a minute and try again.';
  }
  if (error.status === 422) return 'Invalid search query.';

  return githubMessage ?? `Request failed (${error.status}).`;
}
