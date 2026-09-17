import { Pagination } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

import { APP_CONFIG } from '@/config/app.config';
import { useDebounce } from '@/hooks';
import { getTotalPages } from '@/utils/pagination';

import { useSearchReposQuery } from '../api/search-repos';
import { SearchInput } from './search-input';
import { SearchResults } from './search-results';

export function SearchPanel() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState<number>(APP_CONFIG.search.pageSize);

  const debouncedQuery = useDebounce(
    query.trim(),
    APP_CONFIG.search.debounceMs
  );

  const isIdle = debouncedQuery.length < APP_CONFIG.search.minQueryLength;

  const { data, error, isFetching, refetch } = useSearchReposQuery(
    { q: debouncedQuery, page, pageSize },
    { skip: isIdle }
  );

  function handleQueryChange(value: string) {
    setQuery(value);
    setPage(1);
  }

  function handlePageChange(_: React.ChangeEvent<unknown>, newPage: number) {
    setPage(newPage);
  }

  const totalPages = isIdle
    ? 0
    : getTotalPages(data?.total_count ?? 0, pageSize);

  return (
    <Stack spacing={2} sx={{ justifyContent: 'center' }}>
      <SearchInput
        value={query}
        onChange={handleQueryChange}
        isSearching={isFetching}
      />
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
