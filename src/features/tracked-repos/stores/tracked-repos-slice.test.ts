import { describe, expect, it } from 'vitest';

import type { GitHubRepo } from '@/types';

import type { TrackedReposState } from '../types';
import {
  trackedReposReducer,
  trackRepo,
  untrackRepo,
} from './tracked-repos-slice';

function makeRepo(overrides: Partial<GitHubRepo> = {}): GitHubRepo {
  return {
    id: 1,
    full_name: 'facebook/react',
    html_url: 'https://github.com/facebook/react',
    description: 'A library for web and native user interfaces',
    language: 'JavaScript',
    stargazers_count: 230_000,
    open_issues_count: 700,
    updated_at: '2026-09-01T10:00:00Z',
    pushed_at: '2026-09-02T10:00:00Z',
    owner: { login: 'facebook', avatar_url: 'https://avatars.github.com/1' },
    topics: [],
    ...overrides,
  };
}

const emptyState: TrackedReposState = { repos: {}, ids: [] };

describe('trackedReposSlice', () => {
  it('keeps only the id and the full name when tracking', () => {
    const state = trackedReposReducer(emptyState, trackRepo(makeRepo()));

    expect(state.repos[1]).toEqual({ id: 1, full_name: 'facebook/react' });
    expect(state.ids).toEqual([1]);
  });

  it('ignores a repo that is already tracked', () => {
    const tracked = trackedReposReducer(emptyState, trackRepo(makeRepo()));
    const state = trackedReposReducer(tracked, trackRepo(makeRepo()));

    expect(state.ids).toEqual([1]);
  });

  it('keeps repos in the order they were tracked', () => {
    let state = trackedReposReducer(emptyState, trackRepo(makeRepo()));
    state = trackedReposReducer(
      state,
      trackRepo(makeRepo({ id: 2, full_name: 'vuejs/core' }))
    );
    state = trackedReposReducer(
      state,
      trackRepo(makeRepo({ id: 3, full_name: 'sveltejs/svelte' }))
    );

    expect(state.ids).toEqual([1, 2, 3]);
  });

  it('removes the repo from both the map and the ids on untrack', () => {
    let state = trackedReposReducer(emptyState, trackRepo(makeRepo()));
    state = trackedReposReducer(
      state,
      trackRepo(makeRepo({ id: 2, full_name: 'vuejs/core' }))
    );

    state = trackedReposReducer(state, untrackRepo(1));

    expect(state.repos[1]).toBeUndefined();
    expect(state.ids).toEqual([2]);
  });

  it('leaves the state alone when untracking a repo that is not tracked', () => {
    const tracked = trackedReposReducer(emptyState, trackRepo(makeRepo()));

    const state = trackedReposReducer(tracked, untrackRepo(999));

    expect(state).toEqual(tracked);
  });
});
