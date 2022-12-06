import * as React from 'react';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

const Width = window.innerWidth;
const Height = window.innerHeight;

export const Orders = () => {
    return (
        <React.Fragment>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    width: { Width },
                    height: { Height }
                }} >
                <Outlet />
            </Box>
        </React.Fragment>
    );
}