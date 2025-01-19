import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import LayersIcon from '@mui/icons-material/Layers';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { useMyStore } from '../store';

function BottomNav() {

  const { user } = useMyStore();
  const navigate = useNavigate();
  
  const church = user?.church?.toLowerCase().replace(/\s/g, '');
  // console.log(church)

  return (
  <><Stack direction="row" spacing={1}>
      <IconButton aria-label="Home" onClick={() => navigate(`/`)}>
        <HomeIcon />
      </IconButton>
      <IconButton aria-label="Pages" onClick={() => navigate('/pages')}>
        <LayersIcon />
      </IconButton>
      <IconButton aria-label="Community" onClick={() => navigate(`/${church}`)}>
        <Diversity3Icon />
      </IconButton>
      <IconButton aria-label="Profile" onClick={() => navigate(`/${user.primaryPage}`)}>
        <AccountCircleIcon />
      </IconButton>
  </Stack></>
  )
}

export default BottomNav
