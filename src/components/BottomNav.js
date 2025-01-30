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
import MonitorIcon from '@mui/icons-material/Monitor';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Box } from '@mui/material';

function BottomNav({showOnLg}) {

  const { user, currentPage } = useMyStore();
  const navigate = useNavigate();
  
  const church = user?.church?.toLowerCase().replace(/\s/g, '');
  const style =  {height: '10vh', width: '100%', border: '2px solid', }

  return (
  <>
    <Box sx={{...style, display: { lg: showOnLg? 'block' : 'none', md: 'none', xs: 'block' }, }}>
      <Stack direction="row" spacing={1} sx={{height: '100%', display: 'flex', justifyContent: 'center',alignItems: 'center'}} >
        <IconButton  aria-label="Home" onClick={() => navigate(`/`)}>
          <HomeIcon sx={{}} />
        </IconButton>
        <IconButton aria-label="Pages" onClick={() => navigate('/pages')}>
          <LayersIcon />
        </IconButton>
        <IconButton aria-label="Watch" onClick={() => navigate(`/${currentPage.handle}/new`)}>
          <AddBoxIcon />
        </IconButton>
        <IconButton aria-label="Community" onClick={() => navigate(`/${church}`)}>
          <Diversity3Icon />
        </IconButton>
        <IconButton aria-label="Profile" onClick={() => navigate(`/${user.primaryPage}`)}>
          <AccountCircleIcon />
        </IconButton>
      </Stack>
    </Box>
  </>
  )
}

export default BottomNav
