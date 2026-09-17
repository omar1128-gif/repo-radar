import GitHubIcon from '@mui/icons-material/GitHub';
import RadarIcon from '@mui/icons-material/Radar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { ThemeModeSwitcher } from './theme-mode-switcher';

export function AppHeader() {
  return (
    <AppBar position="sticky">
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ gap: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <GitHubIcon sx={{ fontSize: 28 }} />

              <RadarIcon
                color="success"
                sx={{
                  position: 'absolute',
                  top: -4,
                  right: -4,
                  fontSize: 16,
                  bgcolor: 'background.paper',
                  borderRadius: '50%',
                  p: '1px',
                }}
              />
            </Box>
          </Box>

          <Typography
            variant="h6"
            component="h1"
            sx={{
              fontFamily: '"Orbitron", sans-serif',
              fontWeight: 700,
              fontSize: '1.05rem',
              letterSpacing: '0.02em',
              lineHeight: 1,
            }}
          >
            Repo Radar
          </Typography>

          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
            <ThemeModeSwitcher />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
