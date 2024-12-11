import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import { useMyStore } from '../store';

function BottomNav() {

  const { user } = useMyStore();
  const navigate = useNavigate();

  return (
    <ButtonGroup size="large" variant="outlined" aria-label="Basic button group">
      <Button>Home</Button>
      <Button onClick={() => navigate('/pages')}>Pages</Button>
      <Button onClick={() => navigate(`/${user.primaryPage}`)}>Profile</Button>
    </ButtonGroup>
  )
}

export default BottomNav
