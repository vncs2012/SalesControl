import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button,  Grid, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { insert } from './api';
import { Navigate } from 'react-router-dom';
import { alertSucesso, hideLoading, NumberFormatCustom, showLoading } from '../../util';
import PropTypes from 'prop-types';

NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};  

export const Insert = () => {
    const [form, setForm] = useState({nu_value: ''});
    const [save, setSave] = useState(false)

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

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