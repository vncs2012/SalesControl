import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useState, useEffect } from 'react';
import { Paper } from '@mui/material';

export const Sale = ({ dados, title }) => {
  const [data, setData] = useState({ total: 0, date: '' })
  useEffect(() => {
    const saleData = () => {
      setData({ ...dados })
    }
    saleData()
  }, [dados])

  return (
    <Paper elevation={3} sx={{ p: 0.5 ,width: '95%',height:'60%', marginBottom: 2, marginTop: 2, marginLeft: 1, marginRight: 4 }}>
      <Title>{title}</Title>
      <Typography component="p" variant="h6">
        R$ {data.total > 0 ? data.total.toString().replace('.', ',') : "0"}
      </Typography>
    </Paper>
  );
}