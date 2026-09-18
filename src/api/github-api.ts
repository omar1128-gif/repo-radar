import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { APP_CONFIG } from '@/config/app.config';

const token = import.meta.env.VITE_GITHUB_TOKEN;

export const githubApi = createApi({
  reducerPath: 'githubApi',
  tagTypes: ['RepoStats'],
  baseQuery: fetchBaseQuery({
    baseUrl: APP_CONFIG.api.githubBaseUrl,
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      headers.set('Accept', 'application/vnd.github+json');
      headers.set('X-GitHub-Api-Version', APP_CONFIG.api.version);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
