import { Pagination } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks.ts';
import { APP_CONFIG } from '@/config/app.config';
import { useDebounce } from '@/hooks';
import { getTotalPages } from '@/utils/pagination';

import { useSearchReposQuery } from '../api/search-repos';
import { resetPagination, selectSearchState, setPage } from '../stores';
import { SearchInput } from './search-input';
import { SearchResults } from './search-results';

export function SearchPanel() {
  const dispatch = useAppDispatch();
  const { page, pageSize } = useAppSelector(selectSearchState);

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(
    query.trim(),
    APP_CONFIG.search.debounceMs
  );

  useEffect(() => {
    if (debouncedQuery.length >= APP_CONFIG.search.minQueryLength) {
      dispatch(resetPagination());
    }
  }, [debouncedQuery, dispatch]);

  const isIdle = debouncedQuery.length < APP_CONFIG.search.minQueryLength;

  const { data, error, isFetching, refetch } = useSearchReposQuery(
    { q: debouncedQuery, page, pageSize },
    { skip: isIdle }
  );

  function handlePageChange(_: React.ChangeEvent<unknown>, newPage: number) {
    dispatch(setPage(newPage));
  }

  const totalPages = isIdle
    ? 0
    : getTotalPages(data?.total_count ?? 0, pageSize);

  return (
    <Stack spacing={2} sx={{ justifyContent: 'center' }}>
      <SearchInput value={query} onChange={setQuery} isSearching={isFetching} />
      <SearchResults
        isIdle={isIdle}
        isFetching={isFetching}
        data={data}
        error={error}
        onRetry={refetch}
        page={page}
        pageSize={pageSize}
      />
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          sx={{ alignSelf: 'center' }}
        />
      )}
    </Stack>
  );
}
