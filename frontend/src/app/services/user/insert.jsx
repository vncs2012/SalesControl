import React,{ useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Grid, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { insert } from './api';
import { Navigate } from 'react-router-dom';
import { alertSucesso, hideLoading, showLoading } from '../../util';

export const Insert = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        username: '',
    });
    const [save, setSave] = useState(false)

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        showLoading()
        const { data } = await insert(form)
        if (data.status === 201) {
            hideLoading()
            alertSucesso(true,setSave,true)
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
                        <TextField id="username" label="Usuario" type="text"
                            placeholder="Digite nome do Usuario." variant="standard" value={form.username ?? ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            value={form.password ?? ""}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <TextField id="email" label="E-mail" type="text"
                            placeholder="Digite o e-mail." variant="standard" 
                            value={form.email ?? ''}
                            onChange={handleChange}
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
            {save && (
                <Navigate to="/user" replace={true} />
            )}
        </Paper>
    );
}