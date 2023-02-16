import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { deleteApi, fetch_all } from './api'
import { useEffect, useState } from 'react';
import { Options } from '../../layout/Options';
import { deleteAlert, formatDate, NotData, StyledTableCell } from '../../util';
import { Detail } from './detail';
import { Sale } from '../../layout/Sale';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ButtonAdd } from '../../layout/ButtonAdd';

export const List = () => {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)
    const [idDetail, setidDetail] = useState()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(7);

    useEffect(() => {
        const getUsers = async () => {
            let { data } = await fetch_all()
            if (data) {
                setData(data)
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Paper sx={{ minHeight: '100%', overflow: 'hidden' }}>
                <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ top: 2, left: 15 }}>
                    <Grid item xs={4}>
                        <Sale dados={data.day ?? []} title={'DIA'} />
                    </Grid>
                    <Grid item xs={4}>
                        <Sale title={'SEMANA (Ultimos 7 Dias)'} dados={data.week ?? []} />
                    </Grid>
                    <Grid item xs={4}>
                        <Sale title={'MES (Ultimos 30 dias)'} dados={data.month ?? []} />
                    </Grid>
                    <TableContainer sx={{ width: '100%', height: '65vh' }}>
                        <Table stickyHeader size='small'>
                            <TableHead >
                                <TableRow >
                                    <StyledTableCell >ID</StyledTableCell>
                                    <StyledTableCell align={'center'} >Client</StyledTableCell>
                                    <StyledTableCell align={'center'} >Valor</StyledTableCell>
                                    <StyledTableCell align={'center'} >Data</StyledTableCell>
                                    <StyledTableCell align={'center'} >Opções</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(data.list) ? data.list
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TableRow hover tabIndex={-1} key={row.id_sales}>
                                            <StyledTableCell >{row.Sales.id_sales}</StyledTableCell>
                                            <StyledTableCell align="center">{row.Client ? row.Client.no_client : 'Não identificado'}</StyledTableCell>
                                            <StyledTableCell align="center">R$ {row.Sales.nu_value.toString().replace('.', ',')??'0,00'}</StyledTableCell>
                                            <StyledTableCell align="center">{formatDate(row.Sales.dt_sale)}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Options id={row.Sales.id_sales} handleDelete={handleDelete} handleDetail={handleDetail} />
                                            </StyledTableCell>
                                        </TableRow>
                                    )) : <NotData />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[7, 14, 28, 100]}
                        component="div"
                        count={Array.isArray(data.list) ? data.list.length : 15}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Grid>
            </Paper>
            {open ? <Detail open={open} handleClose={handleClose} id={idDetail} /> : null}
            <ButtonAdd />
        </>
    )
}