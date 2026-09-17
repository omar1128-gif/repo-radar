import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { APP_CONFIG } from '@/config/app.config';

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({
    baseUrl: APP_CONFIG.api.githubBaseUrl,
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/vnd.github+json');
      headers.set('X-GitHub-Api-Version', APP_CONFIG.api.version);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
