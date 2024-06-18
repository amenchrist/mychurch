import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMyStore } from '../store';

export default function DeleteEventButton({event}) {
  const navigate = useNavigate();
  const { currentPage, setEvent } = useMyStore();



    const removeEvent = async (e) => {
        try {
            const success = await currentPage.deleteEvent(e);
            if(success){
              setEvent(null);
              navigate(`/${currentPage.handle}/events`);
            }
          } catch (err) {
            console.log('Error deleting event')
            console.log(err);
          }    
      }
  return (
    <IconButton edge="end" aria-label="delete" onClick={() => removeEvent(event)} >
        <DeleteIcon />
    </IconButton>
  )
}
