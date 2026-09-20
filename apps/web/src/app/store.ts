import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { githubApi } from '@/api/github-api';
import { trackedReposReducer } from '@/features/tracked-repos/stores';

import { listenerMiddleware } from './listener-middleware';
import { setupAppListeners } from './setup-listeners';

setupAppListeners();

const rootReducer = combineReducers({
  [githubApi.reducerPath]: githubApi.reducer,
  trackedRepos: trackedReposReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(listenerMiddleware.middleware)
        .concat(githubApi.middleware),
    devTools: import.meta.env.DEV,
    preloadedState,
  });
}

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;

export type AppDispatch = AppStore['dispatch'];
