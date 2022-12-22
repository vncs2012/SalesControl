import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Autocomplete, Button, Grid, MenuItem, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { insert, get_select } from './api';
import { Navigate } from 'react-router-dom';
import { alertSucesso, hideLoading, NumberFormatCustom, showLoading } from '../../util';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};  

export const Insert = () => {
    const [form, setForm] = useState({ nu_value: '', id_client: '' });
    const [client, setClient] = useState([]);
    const [save, setSave] = useState(false)

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        const getClient = async () => {
            let { data } = await get_select('client')
            if (data) {
                setClient(data);
            }
        };
        getClient();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        showLoading()
        const { data } = await insert(form)
        if (data.status === 201) {
            hideLoading()
            alertSucesso(true, setSave, true)
        }
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
                    <Grid item xs={6} md={6}>
                        <TextField
                            label="Valor da Venda"
                            onChange={handleChange}
                            name="nu_value"
                            id="nu_value"
                            InputProps={{
                                inputComponent: NumberFormatCustom
                            }}
                            variant="standard"
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Autocomplete
                            id="id_client"
                            onChange={(event, newValue) => {
                                setForm({
                                    ...form,
                                    'id_client': newValue.id_client,
                                });
                            }}
                            options={client}
                            getOptionLabel={(option) => option.nu_document + ' - ' + option.no_client}
                            renderInput={(params) => (
                                <TextField {...params} label="Clientes" placeholder="Clientes"  variant="standard" />
                              )}
                        />
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
                </Grid>
            </Box>
            {save && (
                <Navigate to="/orders" replace={true} />
            )}
        </Paper>
    );
}