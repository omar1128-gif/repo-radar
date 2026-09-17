import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import IconButton from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';

export function ThemeModeSwitcher() {
  const { mode, setMode, systemMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  const resolvedMode = mode === 'system' ? systemMode : mode;

  const handleClick = () => {
    setMode(resolvedMode === 'light' ? 'dark' : 'light');
  };

  return (
    <IconButton
      aria-label="switch theme"
      onClick={handleClick}
      sx={{
        color: 'action.active',
      }}
    >
      {resolvedMode === 'light' ? (
        <DarkModeOutlinedIcon fontSize="small" />
      ) : (
        <LightModeOutlinedIcon fontSize="small" />
      )}
    </IconButton>
  );
}
