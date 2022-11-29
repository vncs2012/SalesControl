import * as React from 'react';
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';

export const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/vncs2012">
        VNCSISTEMA
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>

  );
}