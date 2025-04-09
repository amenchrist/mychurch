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

  const [ rows, setRows ] = useState([]);
  const [ total, setTotal ] = useState(0);

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
      <Box sx={{ p:2, }}>
       <Typography component="h1" variant="h4">{event?.name.toUpperCase()}</Typography>
       <Typography component="p" >{event?.formattedDate()}</Typography>
       <Typography component="p" >Total: {event?.totalAttendance}</Typography>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 100 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  )
}
