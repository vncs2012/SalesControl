import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getdata } from './api'
import { useEffect } from 'react';
import { useState } from 'react';
import { Options } from '../../layout/Options';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#1976D2',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,
};

export const List = () => {
    const [data, setData] = useState([])
    const  getUsers =  async () => {
        let users = await getdata()
        if (users) {
            setData(users);
        }
    };
    useEffect(() => {
        getUsers();
    }, []);
    return (
        <>
            <Link to="add" >
                <Fab sx={fabStyle} aria-label='add' color='primary'>
                    <AddIcon />
                </Fab>
            </Link>
            <TableContainer component={Paper} sx={{ minWidth: 700, width: 1000 }}>
                <Table  aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Usuario</StyledTableCell>
                            <StyledTableCell align="center">E-mail</StyledTableCell>
                            <StyledTableCell align="center">Opções</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(data) ? data.map((row) => (
                            <StyledTableRow key={row.id_user}>
                                <StyledTableCell component="th" scope="row">
                                    {row.username}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.email}</StyledTableCell>
                                <StyledTableCell align="center"><Options id={row.id_user} service={'user'} /></StyledTableCell>
                            </StyledTableRow>
                        )):'-'}
                    </TableBody>
                </Table>
            </TableContainer>
        </>)
}