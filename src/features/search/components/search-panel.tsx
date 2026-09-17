import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import { APP_CONFIG } from '@/config/app.config';
import { useDebounce } from '@/hooks';
import { getTotalPages } from '@/utils/pagination';

import { useSearchReposQuery } from '../api/search-repos';
import { SearchInput } from './search-input';
import { SearchResults } from './search-results';

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
export function SearchPanel() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(APP_CONFIG.search.pageSize);

  const debouncedQuery = useDebounce(
    query.trim(),
    APP_CONFIG.search.debounceMs
  );

  const isIdle = debouncedQuery.length < APP_CONFIG.search.minQueryLength;

  const { data, error, isFetching, refetch } = useSearchReposQuery(
    { q: debouncedQuery, page, pageSize },
    { skip: isIdle }
  );

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    setPageSize(Number(event.target.value));
    setPage(1);
  };

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
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            pt: 1,
            px: 1,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: { xs: 'none', sm: 'block', width: 120 },
              visibility: 'hidden',
            }}
          >
            --
          </Typography>

          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />

          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Per page:
            </Typography>
            <FormControl size="small">
              <Select
                id="select-page-size"
                value={pageSize}
                onChange={handlePageSizeChange}
                variant="outlined"
                sx={{
                  height: 32,
                  fontSize: '0.875rem',
                  '& .MuiSelect-select': { py: 0.5, px: 1.5 },
                }}
              >
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
