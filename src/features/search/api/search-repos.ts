import { githubApi } from '@/api/github-api';
import type { GitHubRepo, GitHubSearchResponse } from '@/types/github';

import type { SearchQueryParams } from '../types';

const searchReposApiUrls = {
  search: 'search/repositories',
};

const searchReposApi = githubApi.injectEndpoints({
  endpoints: (builder) => ({
    searchRepos: builder.query<
      GitHubSearchResponse<GitHubRepo>,
      SearchQueryParams
    >({
      query: ({ q, page, pageSize }) => ({
        url: searchReposApiUrls.search,
        params: { q, page, per_page: pageSize },
      }),
    }),
  }),
});

export const { useSearchReposQuery } = searchReposApi;
