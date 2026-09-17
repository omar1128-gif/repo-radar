import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { APP_CONFIG } from '@/config/app.config';

interface SearchState {
  page: number;
  pageSize: number;
}

const initialState: SearchState = {
  page: 1,
  pageSize: APP_CONFIG.search.pageSize,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.page = 1;
    },
    resetPagination: (state) => {
      state.page = 1;
      state.pageSize = APP_CONFIG.search.pageSize;
    },
  },
});

export const { setPage, setPageSize, resetPagination } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
