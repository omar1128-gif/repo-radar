export const APP_CONFIG = {
  api: {
    githubBaseUrl: 'https://api.github.com/',
    version: '2026-03-10',
  },
  search: {
    pageSize: 10,
    maxSearchResults: 1000, // Github API limitation
    minQueryLength: 2,
    debounceMs: 400,
  },
  ui: {
    skeletonRows: 5,
  },
} as const;
