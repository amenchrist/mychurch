import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Container, Grid, TextField, Typography } from '@mui/material';
import { useDashboardContext } from '../../contexts/DashboardContextProvider';
import dayjs from 'dayjs';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useMyStore } from '../../store';




export default function EventReport() {
  
  const { event, setShowEventReport, } = useDashboardContext();
  const { currentPage } = useMyStore();

  const [ rows, setRows ] = useState([])
  const [ total, setTotal ] = useState(0)


  useEffect(() => {
    const getAttendanceRecords = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, `pages/${currentPage.handle}/events/${event.id}/attendanceRecords`)); 
        const records = []

        querySnapshot.forEach((doc,i) => {
          const { email, church, attendance, timestamp, deviceType } = doc.data();
          records.push({ id:records.length+1, email, church, attendance, time: dayjs(timestamp).format('HH:mm'), timestamp, deviceType } )
        });
        records.sort((r1,r2) => r1.timestamp - r2.timestamp)
        setRows([...records])
        // const devices = records.map(r => r.deviceType)
        // console.log(devices)
      }catch (err) {
        console.log("Error getting Events")
      } 

      }
    getAttendanceRecords()
  }, [])
  
  const columns = [
    { field: 'time', headerName: 'Time', width: 100 },
    // { field: 'id', headerName: 'ID', width: 40 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'attendance',
      headerName: 'No of Attendees',
      type: 'number',
      width: 90,
    },
    { field: 'church', headerName: 'Church', width: 250 },
  ];

  return (
    
    <div style={{  width: '100%', overflowY: 'auto', height: 500 }}>
      
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
    
  //   <Container component="main" maxWidth="xs" sx={{}}>
       
  //   <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',height:'80%',  }} >
  //     <Typography component="h1" variant="h5">{event?.name.toUpperCase()}</Typography>
  //     <Box component="form" disabled sx={{ mt: 3,  height:'100%', overflowY: 'auto', paddingTop:1}} >
  //     <Grid container spacing={2}>
  //       <Grid item xs={12}>
  //           <TextField disabled fullWidth label="Event Title" id="name" value={name}  />
  //       </Grid>
  //       <Grid item xs={12} sm={6}>
  //           <TextField disabled fullWidth type="date" id="date" label="Date" value={dayjs(date).format('YYYY-MM-DD')} />
  //       </Grid>
  //       <Grid item xs={12} sm={6} >
  //           <TextField disabled fullWidth type="time" id="time" label="Time"  value={dayjs(`${date} ${time}`).format('HH:mm')} />
  //       </Grid>
  //       <Grid item xs={12}>
  //           <TextField disabled fullWidth multiline label="Description" id="description" value={description} />
  //       </Grid>            
  //       <Grid item xs={12} >
  //         <TextField disabled fullWidth label="Watch Link" id="watch-link" value={watchLink} />
  //       </Grid>
  //     </Grid>
  //     <Grid container sx={{mt:2}} justifyContent="space-between">
  //         <Grid item>
  //           <Typography variant='p' onClick={() => setShowEventReport(false)} >Back</Typography>
  //         </Grid>
  //         <Grid item>
  //           <Typography variant='p' onClick={() => setShowEventReport(false)} >Total Attendance: {event.totalAttendance}</Typography>
  //         </Grid>
  //     </Grid>
  //   </Box>
  //   </Box>
  // </Container>
  )
}
