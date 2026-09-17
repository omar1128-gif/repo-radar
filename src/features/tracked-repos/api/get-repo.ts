import { githubApi } from '@/api/github-api';
import type { GitHubRepo } from '@/types';

import type { GetRepoQueryParams } from '../types';

const getRepoApi = githubApi.injectEndpoints({
  endpoints: (builder) => ({
    getRepo: builder.query<GitHubRepo, GetRepoQueryParams>({
      query: ({ owner, repo }) => ({
        url: `repos/${owner}/${repo}`,
      }),
    }),
  }),
});

export const { useGetRepoQuery } = getRepoApi;
