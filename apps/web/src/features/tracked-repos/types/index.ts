import type { GitHubCommit, GitHubRepo } from '@/types';

export type TrackedRepo = Pick<GitHubRepo, 'id' | 'full_name'>;

export interface RepoStats extends GitHubRepo {
  lastCommit: GitHubCommit | null;
}

export interface TrackedReposState {
  repos: Record<number, TrackedRepo>;
  ids: number[];
}
