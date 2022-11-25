import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Menu } from './Menu';
import { Rotas } from './Menu/rotas';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const mdTheme = createTheme();
function DashboardContent() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Menu open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />

                    <Container maxWidth="lg" sx={{ mt: 24, mb: 24 }}>
                        <Main open={open}>
                            <Toolbar />
                            <Rotas />
                        </Main>
                    </Container>
            </Box>
        </ThemeProvider>
    );
}

export const Home = () => {
    return <DashboardContent />;
}