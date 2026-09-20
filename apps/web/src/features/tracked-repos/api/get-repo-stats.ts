import { githubApi } from '@/api/github-api';
import type { GitHubCommit, GitHubRepo } from '@/types';

import type { RepoStats } from '../types';

export const trackedReposApi = githubApi.injectEndpoints({
  endpoints: (builder) => ({
    getRepoStats: builder.query<RepoStats, string>({
      async queryFn(fullName, _queryApi, _extraOptions, baseQuery) {
        const [repoResult, commitsResult] = await Promise.all([
          baseQuery(`repos/${fullName}`),
          baseQuery({
            url: `repos/${fullName}/commits`,
            params: {
              per_page: 1,
            },
          }),
        ]);

        if (repoResult.error) {
          return {
            error: repoResult.error,
          };
        }

        // check error, and if the error is not an empty repo that has no commits.
        if (commitsResult.error && commitsResult.error.status !== 409) {
          return {
            error: commitsResult.error,
          };
        }

        const commits = (commitsResult.data ?? []) as GitHubCommit[];

        return {
          data: {
            ...(repoResult.data as GitHubRepo),
            lastCommit: commits[0] ?? null,
          },
        };
      },
      providesTags: (_result, _error, fullName) => [
        { type: 'RepoStats', id: fullName },
      ],
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useGetRepoStatsQuery } = trackedReposApi;
