import * as React from 'react';
import Paper from '@mui/material/Paper';
import { get_home } from '../homeApi';
import { Grid } from '@mui/material';
import { Sale } from './Sale';
import { useEffect } from 'react';

export function Dashboard() {
  const [data, setData] = React.useState({})
  useEffect(() => {
    const getHome = () => {
      let {data} = get_home()
      setData(data)
    }
    getHome()
  }, [data])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                 <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ top: 2, left: 15 }}>
                <Grid item xs={4}>
                    <Sale dados={data.day ?? []} title={'DIA'} />
                </Grid>
                <Grid item xs={4}>
                    <Sale title={'SEMANA (Ultimos 7 Dias)'} dados={data.week ?? []} />
                </Grid>
                <Grid item xs={4}>
                    <Sale title={'MES (Ultimos 30 dias)'} dados={data.month ?? []} />
                </Grid>
            </Grid>
    </Paper>
  );
}