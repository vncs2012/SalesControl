import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import { NumericFormat } from 'react-number-format';
import { Button, Paper, TextField } from '@mui/material'
import { Navigate } from 'react-router-dom';
import { alertSucesso, hideLoading, showLoading } from '../../util';
import { insert } from './api';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& .MuiTextField-root': {
//       margin: theme.spacing(1),
//       width: '99%',
//     },
//   },
// }));
export const Insert = () => {
  const [form, setForm] = useState({ name: '', price: '', description: '', price_edge: '' });
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
      alertSucesso(true, setSave)
    }
  }
  
  return (
    <Paper elevation={3} sx={{ p: 2, width: '100%' }}>
      <form noValidate autoComplete="off">
        <Grid container spacing={2}  >
          <Grid item xs={12} sm={6} lg={6} xl={6}>
            <TextField
              id="name"
              label="Nome do Produto"
              variant="standard"
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={6} xl={6}>
            <NumericFormat
              id="price"
              label="Preço do Produto"
              variant="standard"
              customInput={TextField}
              defaultValue={0}
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
              defaultValue={0}
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
      </form>
      {save && (
        <Navigate to="/products" replace={true} />
      )}
    </Paper>
  )
}