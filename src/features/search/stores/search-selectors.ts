import type { RootState } from '@/app/store';

export const selectSearchState = (state: RootState) => state.search;
export const selectSearchPage = (state: RootState) => state.search.page;
export const selectSearchPageSize = (state: RootState) => state.search.pageSize;
