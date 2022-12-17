import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { fetch_all, search } from './api';
import TextField from '@mui/material/TextField';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { hideLoading, showLoading, FormatDocumentCpf } from '../../util';
import { Button, FormControl, Grid, Input, InputLabel, Paper } from '@mui/material';


FormatDocumentCpf.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
export const Search = ({ setData }) => {
    const [form, setForm] = useState({ nu_document: '', no_client: '', });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.id?? event.target.name]: event.target.value,
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