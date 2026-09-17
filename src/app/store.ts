import { configureStore } from '@reduxjs/toolkit';

import { githubApi } from '@/api/github-api';
import { trackedReposReducer } from '@/features/tracked-repos/stores';

import { listenerMiddleware } from './listener-middleware';
import { setupAppListeners } from './setup-listeners';

setupAppListeners();

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    trackedRepos: trackedReposReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(githubApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
