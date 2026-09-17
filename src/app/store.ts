import { configureStore } from '@reduxjs/toolkit';

import { githubApi } from '@/api/github-api';
import { searchReducer } from '@/features/search/stores/search-slice';

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
