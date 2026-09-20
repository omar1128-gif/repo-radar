import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  isSearching: boolean;
}

export function SearchInput({
  value,
  onChange,
  isSearching,
}: SearchInputProps) {
  return (
    <TextField
      fullWidth
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search repositories..."
      slotProps={{
        htmlInput: { 'aria-label': 'Search GitHub repositories' },
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment:
            isSearching || value ? (
              <InputAdornment position="end">
                {isSearching && (
                  <CircularProgress size={18} aria-label="Searching" />
                )}
                {value && (
                  <IconButton
                    aria-label="Clear search"
                    edge="end"
                    onClick={() => onChange('')}
                    sx={{
                      mr: -0.5,
                    }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                )}
              </InputAdornment>
            ) : undefined,
        },
      }}
    />
  );
}
