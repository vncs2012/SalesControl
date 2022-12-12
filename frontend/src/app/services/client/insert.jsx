import { useState } from 'react';
import Box from '@mui/material/Box';
import { insert } from './api';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Paper } from '@mui/material';
import { alertSucesso, FormatContact, FormatDocumentCpf, hideLoading, showLoading, tpSex } from '../../util';

FormatContact.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
FormatDocumentCpf.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export const Insert = () => {
    const [form, setForm] = useState({
        email: '', tp_sex: '', no_client: '',
        nu_document: '', nu_contact: '', address: '',
    });
    const [save, setSave] = useState(false)

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id ?? event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(form)
        // showLoading()
        const { data } = await insert(form)
        if (data.status === 201) {
            // hideLoading()
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
                        <TextField id="no_client" label="Cliente" type="text"
                            placeholder="Digite nome do Cliente." variant="standard" value={form.no_client ?? ''}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl variant="standard" sx={{ width: '96%', marginTop: 1 }}>
                            <InputLabel htmlFor="nu_document">Cpf</InputLabel>
                            <Input
                                value={form.nu_document ?? ''}
                                onChange={handleChange}
                                placeholder="Digite o Cpf"
                                name="nu_document"
                                id="nu_document"
                                inputComponent={FormatDocumentCpf}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <TextField
                            id="tp_sex"
                            name='tp_sex'
                            select
                            label="Sexo"
                            value={form.tp_sex ?? ''}
                            onChange={handleChange}
                            variant="standard"
                        >
                            {tpSex.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <FormControl variant="standard" sx={{ width: '96%', marginTop: 1 }}>
                            <InputLabel htmlFor="nu_contact">Telefone</InputLabel>
                            <Input
                                value={form.nu_contact ?? ''}
                                onChange={handleChange}
                                name="nu_contact"
                                id="nu_contact"
                                inputComponent={FormatContact}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <TextField id="email" label="E-mail" type="text"
                            placeholder="Digite o e-mail." variant="standard"
                            value={form.email ?? ''}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                        <TextField
                            id="address"
                            label="Endereço"
                            onChange={handleChange}
                            multiline
                            rows={2}
                            defaultValue=""
                            variant="standard"
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