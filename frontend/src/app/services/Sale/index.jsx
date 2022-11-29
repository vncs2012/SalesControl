import * as React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { List } from './list';

const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,
};
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight - 150;

export function Sales() {
    return (
        <React.Fragment>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    width: { windowWidth },
                    height: { windowHeight }
                }} >
                <Fab sx={fabStyle} aria-label='add' color='primary'>
                    <AddIcon />
                </Fab>
                <List />
            </Box>
        </React.Fragment>
    );
}