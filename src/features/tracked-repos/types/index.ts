import type { GitHubRepo } from '@/types';

export type TrackedRepoItem = Pick<GitHubRepo, 'id' | 'full_name'>;

export interface TrackedReposState {
  repos: Record<number, TrackedRepoItem>;
  ids: number[];
}

export interface GetRepoQueryParams {
  owner: string;
  repo: string;
}
