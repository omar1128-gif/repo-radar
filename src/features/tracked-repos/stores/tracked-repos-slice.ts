import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { GitHubRepo } from '@/types';

import type { TrackedRepoItem, TrackedReposState } from '../types';
import { loadTrackedRepos } from '../utils';

function buildInitialState(items: TrackedRepoItem[]): TrackedReposState {
  const repos: Record<number, TrackedRepoItem> = {};
  const ids: number[] = [];

  for (const item of items) {
    repos[item.id] = item;
    ids.push(item.id);
  }

  return { repos, ids };
}

export const trackedReposSlice = createSlice({
  name: 'trackedRepos',
  initialState: (): TrackedReposState => buildInitialState(loadTrackedRepos()),
  reducers: {
    trackRepo(state, action: PayloadAction<GitHubRepo>) {
      if (state.repos[action.payload.id]) return;

      state.repos[action.payload.id] = {
        id: action.payload.id,
        full_name: action.payload.full_name,
      };
      state.ids.push(action.payload.id);
    },

    untrackRepo(state, action: PayloadAction<number>) {
      delete state.repos[action.payload];
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
  },
});

export const { trackRepo, untrackRepo } = trackedReposSlice.actions;
export const trackedReposReducer = trackedReposSlice.reducer;
