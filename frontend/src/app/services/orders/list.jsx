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
import { Fab, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { deleteApi, fetch_all } from './api'
import { useEffect, useState } from 'react';
import { Options } from '../../layout/Options';
import { deleteAlert, formatDate } from '../../util';
import { Detail } from './detail';
import { Search } from './search';
import { Sale } from '../../layout/Sale';

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
        deleteAlert(deleteApi, id, setData, data, 'id_sales')
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
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ top: 2, left: 15 }}>
                <Grid item xs={4}>
                    <Sale dados={data.day ?? []} title={'DIA'} />
                </Grid>
                <Grid item xs={4}>
                    <Sale title={'SEMANA (Ultimos 7 Dias)'} dados={data.week ?? []} />
                </Grid>
                <Grid item xs={4}>
                    <Sale title={'MES (Ultimos 30 dias)'} dados={data.month ?? []} />
                </Grid>
            </Grid>
            <TableContainer component={Paper} sx={{ minWidth: 700, width: 1000 }}>
                <Table  aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell  align="center">Client</StyledTableCell>
                            <StyledTableCell>Valor</StyledTableCell>
                            <StyledTableCell align="center">Data</StyledTableCell>
                            <StyledTableCell align="center">Opções</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(data.list) ? data.list.map((row) => (
                            <StyledTableRow key={row.Sales.id_sales}>
                                <StyledTableCell component="th" scope="row">{row.Sales.id_sales}</StyledTableCell>
                                <StyledTableCell align="center"  component="th" scope="row">{row.Client ? row.Client.no_client : '-'}</StyledTableCell>
                                <StyledTableCell component="th" scope="row">{row.Sales.nu_value}</StyledTableCell>
                                <StyledTableCell align="center">{formatDate(row.Sales.dt_sale)}</StyledTableCell>
                                <StyledTableCell align="center"><Options id={row.Sales.id_sales} handleDelete={handleDelete} handleDetail={handleDetail} /></StyledTableCell>
                            </StyledTableRow>
                        )):'-'}
                    </TableBody>
                </Table>
            </TableContainer>
            {open ? <Detail open={open} handleClose={handleClose} id={idDetail} /> : null}
        </>)
}