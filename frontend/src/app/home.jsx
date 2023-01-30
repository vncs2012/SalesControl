import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Menu } from './layout/index'
import './HomeStyle.css';
import { Copyright } from './layout/Copyright';
import { createTheme, ThemeProvider } from '@mui/material';
import { Routers } from './layout/Router';
import * as locales from '@mui/material/locale';

export const Home = () => {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    
    const theme = createTheme({
      palette: {
        primary: {
          main: '#ff4400',
        },
        secondary: {
          light: '#0066ff',
          main: '#0044ff',
          contrastText: '#ffcc00',
        },
        custom: {
          light: '#ffa726',
          main: '#f57c00',
          dark: '#ef6c00',
          contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
      },
    });

    const themeWithLocale = React.useMemo(
      () => createTheme(theme, locales['ptBR']),
      [theme],
    );

    return (
        <ThemeProvider theme={themeWithLocale}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Menu open={open} handleDrawerOpen={toggleDrawer} />
                <Box
                    sx={{
                        flexGrow: 0,
                        width: '100% !important',
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 2, mb: 2, }}>
                        <Grid container spacing={1}>
                            <Routers />
                        </Grid>
                        <Copyright sx={{ pt: 2 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}