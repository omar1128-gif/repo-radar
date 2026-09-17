import { githubApi } from '@/api/github-api';
import type { GitHubRepo, GitHubSearchResponse } from '@/types';

import type { SearchQueryParams } from '../types';

const searchReposApi = githubApi.injectEndpoints({
  endpoints: (builder) => ({
    searchRepos: builder.query<
      GitHubSearchResponse<GitHubRepo>,
      SearchQueryParams
    >({
      query: ({ q, page, pageSize }) => ({
        url: 'search/repositories',
        params: { q, page, per_page: pageSize },
      }),
    }),
  }),
});

export const { useSearchReposQuery } = searchReposApi;
