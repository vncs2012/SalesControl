import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Grid, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export const Insert = () => {
    return (
        <Paper elevation={3} sx={{ p: 2, width: 1000 }}>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '95%' },
                }}
                noValidate
                autoComplete="on"
            >
                <Grid container spacing={2}>
                    <Grid item xs={6} md={6}>
                        <TextField id="standard-textarea" label="Usuario"
                            placeholder="Digite nome do Usuario." variant="standard"
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <TextField id="standard-textarea" label="E-mail"
                            placeholder="Digite o e-mail." variant="standard"
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <Button variant="contained" endIcon={<SendIcon />} sx={{
                        float: 'right',
                        position: 'flex',

                        width: 150
                    }}>
                        Salvar
                    </Button>
                </Grid>
            </Box>
        </Paper>
    );
}