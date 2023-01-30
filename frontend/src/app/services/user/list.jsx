import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { deleteApi, fetch_all } from './api'
import { useEffect, useState } from 'react';
import { Options } from '../../layout/Options';
import { deleteAlert, NotData, StyledTableCell } from '../../util';
import { Detail } from './detail';
import { Search } from './search';

const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,
};

export const List = () => {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [idDetail, setidDetail] = useState()

    useEffect(() => {
        const getUsers = async () => {
            let {data} = await fetch_all()
            if (data) {
                setData(data);
            }
        };
        getUsers();
    }, []);

    const handleDelete = (id) => {
        deleteAlert(deleteApi, id, setData, data, 'id_user')
    }

    const handleDetail = (id) => {
        setidDetail(id)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Link to="add" >
                <Fab sx={fabStyle} aria-label='add' color='primary'>
                    <AddIcon />
                </Fab>
            </Link>
            <Search setData={setData} />
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
                            <TableRow hover key={row.id_user}>
                                <StyledTableCell component="th" scope="row">{row.username}</StyledTableCell>
                                <StyledTableCell align="center">{row.email}</StyledTableCell>
                                <StyledTableCell align="center"><Options id={row.id_user} handleDelete={handleDelete} handleDetail={handleDetail} /></StyledTableCell>
                            </TableRow>
                        )) : <NotData />}
                    </TableBody>
                </Table>
            </TableContainer>
            {open ? <Detail open={open} handleClose={handleClose} id={idDetail} /> : null}
        </>)
}