import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store';

export const selectTrackedRepos = (state: RootState) => {
  return state.trackedRepos.repos;
};

export const selectTrackedRepoIds = (state: RootState) => {
  return state.trackedRepos.ids;
};

export const selectTrackedRepoById = (state: RootState, id: number) => {
  return state.trackedRepos.repos[id];
};

export const selectTrackedReposList = createSelector(
  selectTrackedRepos,
  selectTrackedRepoIds,
  (repos, ids) => ids.map((id) => repos[id])
);

export const selectIsRepoTracked = (state: RootState, id: number) => {
  return Boolean(state.trackedRepos.repos[id]);
};
