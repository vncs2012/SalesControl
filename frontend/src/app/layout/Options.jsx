import * as React from 'react';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { Box, Fab } from '@mui/material';

export const Options = ({ id, handleDelete, handleDetail }) => {
  const linkStyle = { textDecoration: 'none', color: 'inherit' }
  return (
    <React.Fragment> 
      <Box sx={{ '& > :not(style)': { m: 0.5 } }}>
        <Fab size="small" aria-label="Detail">
          <TravelExploreIcon onClick={() => handleDetail(id)} />
        </Fab>
        <Fab size="small" aria-label="edit">
          <Link to={id + '/'} style={linkStyle}>
        <CreateOutlinedIcon />
      </Link>
        </Fab>
        <Fab size="small" aria-label="delete">
      <CloseIcon onClick={()=>handleDelete(id)} />
        </Fab>
      </Box>
    </React.Fragment >
  );
}