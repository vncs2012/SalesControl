import * as React from 'react';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Link } from 'react-router-dom';

export const Options = ({ id, service }) => {
  console.log(id)
  return (
    <React.Fragment>
      <Link to={id+'/'} >
        <CreateOutlinedIcon />
      </Link>
    </React.Fragment >
  );
}