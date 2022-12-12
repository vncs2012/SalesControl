import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import { formatDate } from '../util';

function preventDefault(event) {
  event.preventDefault();
}

export const Sale = ({ dados, title }) => {
  const [data, setData] = useState({ total: 0, date: '' })
  useEffect(() => {
    const saleData = () => {
      setData({ ...dados })
    }
    saleData()
  }, [dados])

  return (
    <Paper elevation={3} sx={{ p: 1, width: '95%', marginBottom: 2, marginTop: 2, marginLeft: 1, marginRight: 4 }}>
      <Title>{title}</Title>
      <Typography component="p" variant="h4">
        R$ {data.total > 0 ? data.total.toString().replace('.', ',') : "0"}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {data.date ? formatDate(data.date) : '-'}
      </Typography>
    </Paper>
  );
}