import * as React from 'react';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

export const Options = ({ id, handleDelete }) => {
  return (
    <React.Fragment>
      <Link to={id+'/'} >
        <CreateOutlinedIcon />
      </Link>
      <CloseIcon onClick={()=>handleDelete(id)} />
    </React.Fragment >
  );
}