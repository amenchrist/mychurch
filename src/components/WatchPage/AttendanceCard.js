import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useMyStore } from '../../store';
import EmailForm from './EmailForm';
import { Typography } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import FirstTimersForm from './FirstTimersForm';
import { useWatchPageContext } from '../../contexts/WatchPageContextProvider';
import AttendanceForm from './AttendanceForm';

export default function AttendanceCard() {

  const { emailCaptured, isRegistered, attendanceCaptured, setAttendanceCaptured, userIsParticipant, setUserIsParticipant } = useWatchPageContext();

	console.log(useWatchPageContext())
  const { event, user, setUser, currentPage } = useMyStore();
  const [ enableLogIn, setEnableLogin ] = useState(true);

  // const userIsParticipant = event?.attendanceRecords.some(r => r.email === user.email);

	useEffect(() => {

		const checkParticipant = async () => {
			const querySnap = await getDoc(doc(db, `pages/${currentPage.handle}/events/${event.id}/attendanceRecords`, user?.email))
			setUserIsParticipant(querySnap.exists())
		}
		if(user?.email) {
			checkParticipant()
		}		
	}, [user, currentPage, event, setUserIsParticipant])

	// useEffect(() => {
	// 	if(userIsParticipant && attendee.email === undefined){
	// 		setEmailCaptured(true)
	// 	}
	// }, [userIsParticipant, emailCaptured])

  useEffect(() => {
     if(!isRegistered && enableLogIn){
          setEnableLogin(false)
     } else if(isRegistered && !enableLogIn){
          setEnableLogin(true)
     }
  }, [isRegistered, enableLogIn])


  return (
    // <div style={{padding: 30,}}>
			<Card sx={{ maxWidth: 450, height: '70vh', borderRadius: 0.5, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}} >
        <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flh5.googleusercontent.com%2Fproxy%2F2p8jyQzsyPF1C53C3QSn54KA-OUo9l4ZPWJvHaZu1sZn4V9SgQTOaZDj3x3zZPcCQAAKDHqmrPbz0CGj0ehr4ivgF7HnECCQgXSek4SZwp1W%3Ds0-d&f=1&nofb=1&ipt=7804ba2986dda170e5dabdfb2fc8d6d2960a1266e1cc096b7312906b328347dd&ipo=images"
        />
        <CardContent >
            <Typography variant="body2" color="text.secondary" textAlign={'center'}>
                HAPPENING NOW
            </Typography>
            <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
            {event.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign={'center'}>
                {event.bio}
            </Typography>
            { userIsParticipant || emailCaptured ? <AttendanceForm /> : isRegistered? <EmailForm /> : <FirstTimersForm /> }
        </CardContent>
        {/* </div> */}
			</Card>
  )
}
