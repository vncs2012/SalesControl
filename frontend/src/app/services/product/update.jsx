import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Grid, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { find, update as updateApi } from './api';
import { Navigate, useParams } from 'react-router-dom';
import { hideLoading } from '../../util';
import { NumericFormat } from 'react-number-format';

export const Update = () => {
    const [form, setForm] = useState({ name: '', price: 0, description: '', price_edge: 0 });
    const [update, setUpdate] = useState(false)
    const { id } = useParams();

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id ?? event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        const getProduct = async () => {
            let product = await find(id)
            if (product) {
                console.log(product)
                setForm({ ...product });
                hideLoading()
            }
        };
        getProduct();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateApi(id, form, setUpdate)
    }

    return (
        <Paper elevation={3} sx={{ p: 2, width: 1000 }}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '95%' },
                }}
                noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} lg={6} xl={6}>
                        <TextField
                            id="name"
                            label="Nome do Produto"
                            variant="standard"
                            onChange={handleChange}
                            value={form.name ?? ""}
                            fullWidth
                            focused={true}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6} xl={6}>
                        <NumericFormat
                            id="price"
                            label="Preço do Produto"
                            variant="standard"
                            customInput={TextField}
                            value={form.price ?? 0}
                            prefix="R$"
                            decimalScale={2}
                            thousandSeparator
                            fixedDecimalScale
                            allowNegative={false}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6} xl={6}>
                        <TextField
                            id="description"
                            label="Descição do produto"
                            onChange={handleChange}
                            variant="standard"
                            value={form.description ?? ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6} xl={6}>
                        <NumericFormat
                            id="price_edge"
                            label="Preço da bordar"
                            placeholder='Caso seja uma Pizza coloque preço da borda para ela.'
                            variant="standard"
                            onChange={handleChange}
                            customInput={TextField}
                            defaultValue={form.price_edge ?? ""}
                            prefix="R$"
                            decimalScale={2}
                            thousandSeparator
                            fixedDecimalScale
                            allowNegative={false}
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <Button onClick={handleSubmit} variant="contained" endIcon={<SendIcon />} sx={{ float: 'right', position: 'flex', width: 150 }} >
                        Salvar
                    </Button>
                </Grid>
            </Box>
            {update && (
                <Navigate to="/products" replace={true} />
            )}
        </Paper>
    );
}