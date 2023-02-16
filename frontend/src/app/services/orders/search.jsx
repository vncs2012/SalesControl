import React,{ useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Grid, Paper } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { fetch_all, search } from './api';
import { hideLoading, showLoading } from '../../util';

export const Search = ({ setData }) => {
    const [form, setForm] = useState({ email: '', username: '', });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value,
        });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        showLoading('Por favor Aguarde...')
        const { data } = await search(form)
        if (data) {
            setData(data)
            hideLoading()
        }
    }
    const handleClear = async (event) => {
        event.preventDefault();
        showLoading('Por favor Aguarde...')
        const { data } = await fetch_all()
        if (data) {
            setData(data)
            hideLoading()
            setForm({ email: '', username: '', })
        }
    }

    return (
        <Paper elevation={3} sx={{ p: 1, width: 1000, marginBottom: 2 }}>
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
                    <Button onClick={handleClear} sx={{ float: 'right', position: 'flex', width: 200 }} >
                        Limpar Pesquisa
                    </Button>
                    <Button onClick={handleSubmit} endIcon={<SearchOutlinedIcon />} sx={{ float: 'right', position: 'flex', width: 150 }} >
                        Pesquisar
                    </Button>
                </Grid>
            </Box>
        </Paper>
    );
}