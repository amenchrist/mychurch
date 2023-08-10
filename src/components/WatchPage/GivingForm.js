import React from 'react';
import { Box, TextField, InputLabel, MenuItem, FormControl, Select, Button, Link } from '@mui/material';
import { useStateContext } from '../../contexts/ContextProvider';

function GivingForm() {

  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  function LoveworldPay(){
    const { currentMember,  } = useStateContext();

    return (
      <div style={{padding: '20px'}}>
        <h2 >Giving</h2>
        <Box sx={{ minWidth: 120, marginTop: '15px' }}  >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value={"Tithe"}>Tithe</MenuItem>
              <MenuItem value={"Offering"}>Offering</MenuItem>
              <MenuItem value={"First Fruit"}>First Fruit</MenuItem>
              <MenuItem value={"Rhapsody of Realities"}>Partnership(Rhapsody of Realities)</MenuItem>
              <MenuItem value={"Healing School"}>Partnership(Healing School)</MenuItem>
              <MenuItem value={"Loveworld UK"}>Partnership(Loveworld UK)</MenuItem>
              <MenuItem value={"Inner City Mission"}>Partnership(Inner City Mission)</MenuItem>

             

            </Select>

            <TextField id="outlined-basic" label="Amount" variant="outlined" sx={{marginTop: '15px'}} />
            <TextField id="outlined-basic" label="Email*" variant="outlined" sx={{marginTop: '15px'}} value={currentMember.email} />
            <Link  href="https://christembassybarking.org/give">

            <Button variant="contained" sx={{width: '100%', marginTop: '15px', mb: '15px'}}>Make Payment</Button>
            </Link>
          </FormControl>
          <Link href="#" variant="body2" >
            See Giving Records (COMING SOON)
          </Link>
        </Box>
        {/* <Box //// "/member-dashboard"
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
          <TextField id="outlined-basic" label="Amount" variant="outlined" />
          <TextField id="outlined-basic" label="Email*" variant="outlined" />
        </Box> */}
      </div>
    )
  }

  


  return (
    <>
    <LoveworldPay />
    {/* <iframe src='https://kingspayweb.com/' width={'100%'} height={'800px'} ></iframe> */}
    </>
  )
}

export default GivingForm

