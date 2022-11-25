import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';

const linkStyle = {textDecoration : 'none', color:'inherit'}
export const mainListItems = (
    <React.Fragment>
        <Link to="/" style={linkStyle}>
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="HOME" />
            </ListItemButton>
        </Link>
        <Link to="/orders" style={linkStyle}>
            <ListItemButton>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="VENDAS" />
            </ListItemButton>
        </Link>
        <Link to="/client" style={linkStyle}>
        <ListItemButton>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="CLIENTES" />
        </ListItemButton>
        </Link>
    </React.Fragment>
);
