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
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

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
        const getProduct = async () => {
            let { data } = await fetch_all()
            if (data) {
                console.log(data)
                setData(data);
            }
        };
        getProduct();
    }, []);

    const handleDelete = (id) => {
        deleteAlert(deleteApi, id, setData, data, 'id')
    }

    const handleDetail = (id) => {
        setidDetail(id)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid2
            container direction="row" justifyContent="center" alignItems="stretch"
        >

            <Link to="add" >
                <Fab sx={fabStyle} aria-label='add' color='primary'>
                    <AddIcon />
                </Fab>
            </Link>
            {/* <Search setData={setData} /> */}
            <Grid2 item xs={12} justifyContent="center" >
                <TableContainer component={Paper}>
                    <Table aria-label="customized table" size="small" sx={{ minWidth: 1128, m: 0, width: '100%' }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Nome</StyledTableCell>
                                <StyledTableCell align="center">Tipo</StyledTableCell>
                                <StyledTableCell align="center">Preço</StyledTableCell>
                                <StyledTableCell align="center">Adicional</StyledTableCell>
                                <StyledTableCell align="center">Opções</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(data) ? data.map((row) => (
                                <TableRow hover key={row.id}>
                                    <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                                    <StyledTableCell align="center">-</StyledTableCell>
                                    <StyledTableCell align="center">R$ {row.price.toString().replace('.', ',')}</StyledTableCell>
                                    <StyledTableCell align="center">R$ {row.price_edge.toString().replace('.', ',')}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Options id={row.id} handleDelete={handleDelete} handleDetail={handleDetail} />
                                    </StyledTableCell>
                                </TableRow>
                            )) : <NotData />}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid2>
            {open ? <Detail open={open} handleClose={handleClose} id={idDetail} /> : null}
        </Grid2>)
}