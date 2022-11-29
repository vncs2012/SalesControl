import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Menu } from './layout/index'
import { Rotas } from './layout/rotas'
import './HomeStyle.css';
import { Copyright } from './layout/Copyright';
import { createTheme, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
    // palette: {
    //   mode: 'dark',
    //   primary: {
    //     main: '#1976d2',
    //   },
    // },
});
export const Home = () => {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={darkTheme}>
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
                            <Rotas />
                        </Grid>
                        <Copyright sx={{ pt: 2 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}