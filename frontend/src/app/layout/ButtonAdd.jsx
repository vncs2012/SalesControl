import { Fab } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import AddIcon from '@mui/icons-material/Add';

const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,
};

export const ButtonAdd = () => {
    return (
        <Link to="add" >
            <Fab sx={fabStyle} aria-label='add' color='primary'>
                <AddIcon />
            </Fab>
        </Link>
    )
}