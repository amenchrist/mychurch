import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useMyStore } from '../store';
import AttendancePage from '../pages/@watchPage/AttendancePage';
import EmailForm from './WatchPage/EmailForm';
import { Button, TextField, Grid, Box, Typography } from '@mui/material';
import { collection, doc, getDoc, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { attendanceRegex, emailRegex } from '../regex';
import { v4 as uuidv4 } from 'uuid';
import { osName, deviceDetect, deviceType } from 'react-device-detect';
import { useGeolocated } from "react-geolocated";

export default function AttendanceCard({setAttendanceCaptured}) {

  const { event, user, setUser, currentPage } = useMyStore();
  const [ isRegistered, setIsRegistered ] = useState(true);
  const [ email, setEmail ] = useState(user?.email || '');
  const [ valid, setValid ] = useState(true);
  const [ enableLogIn, setEnableLogin ] = useState(true);
	const [ emailCaptured, setEmailCaptured ] = useState(user?.email? true : false);
	const [ userIsParticipant, setUserIsParticipant ] = useState(false)

  // const userIsParticipant = event?.attendanceRecords.some(r => r.email === user.email);

	useEffect(() => {

		const checkParticipant = async () => {
			const querySnap = await getDoc(doc(db, `pages/${currentPage.handle}/events/${event.id}/attendanceRecords`, user?.email))
			setUserIsParticipant(querySnap.exists())
		}

		if(user?.email) {
			checkParticipant()
		}

		
	}, [user, currentPage, event])

	useEffect(() => {
		if(userIsParticipant && emailCaptured === false){
			setEmailCaptured(true)
		}
	}, [userIsParticipant, emailCaptured])

  useEffect(() => {
     if(!isRegistered && enableLogIn){
          setEnableLogin(false)
     } else if(isRegistered && !enableLogIn){
          setEnableLogin(true)
     }
  }, [isRegistered, enableLogIn])

  const handleValidation = (value) => {
    setIsRegistered(true)
    //set email to user input
    setEmail(value.toLowerCase().trim());
    //define regex     
    const reg = new RegExp(emailRegex); 
    //test whether input is valid
    setValid(reg.test(value));
  }

	
  const startRegistration = () => {
		// if(email && valid){
			//   setUser({...{}, email, isRegistered: false });
			// } else {
				//   setValid(false)
				// }
			}
			
			
	const EmailForm = () => {

		const handleSubmit = (e) => {
			e.preventDefault();
			checkEmail()
		}
		const checkEmail = () => {
			// console.log('checking if email is registered')
			// if(!valid && email !=='' ) return
			(async () => {
				try {
					const docRef = doc(db, 'userProfiles', email)
					const docSnap = await getDoc(docRef);
					if (docSnap.exists()){
						// console.log("Email exists");
						// setIsRegistered(true)
						setEmailCaptured(true)
						setUser({email})
					} else {
						setIsRegistered(false)
					}
				} catch (err) {
					console.log("Error validating email");
					// console.log(err)
				}
			})()
		}  
    return (
			<>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}  >
					<Grid container spacing={2} >
						<Grid item xs={12} >
							<TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={email} error={!valid} autoFocus 
							onChange={(e) => handleValidation(e.target.value)}
							/>
						</Grid>
					</Grid>
					{!isRegistered? <Typography component="h5" variant="p" sx={{ mt: 2,  textAlign: 'center', color: 'red' }}>
							Email not found! Are you new here?
					</Typography> : <></> }
					{isRegistered? <></> :
						<Button type="submit" fullWidth variant="outlined" sx={{ mt:1, mb: 2 }} onClick={startRegistration} >
						I'm New Here
						</Button>
						}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 2, mb: 2 }}
						disabled={!enableLogIn}
					>
						Join Meeting
					</Button>
				</Box>
    	</>
    )
  }

  const AttendanceForm = () => {
     const [ attendance, setAttendance ] = useState(false);
     const [ validAttendance, setValidAttendance ] = useState(true);
		 const { coords } = useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
    	});

     const handleValidation = (value, setFunc, valFunc, regex) => {
          //set email to user input
          setFunc(value);
          
          //define regex     
          const reg = new RegExp(regex); 
          
          //test whether input is valid
          valFunc(reg.test(value));
      };

			const handleAttendance = async (e) => {
				e.preventDefault();

				if(userIsParticipant){
					//Update Doc
					try {
						await updateDoc(doc(db, `pages/${currentPage.handle}/events/${event.id}/attendanceRecords`, user.email), { attendance: attendance, });
	
						setAttendanceCaptured(true);
					} catch (err) {
						console.log('Error updating event attendance records');
						console.log(err);
					}

				} else {
					//add new attendance record
					const attendanceRecord = {
						id: `att_${uuidv4().split('-').join("")}`,
						email: email ,
						timestamp: new Date().getTime(),
						church: 'Christ Embassy Barking',
						attendance: attendance,
						geolocation: {...coords},
						// origin: orgDetails.url,
						osName,  deviceType,
						device: {...deviceDetect},
					}

					try {
						await setDoc(doc(db, `pages/${currentPage.handle}/events/${event.id}/attendanceRecords`, email), attendanceRecord);
	
						setAttendanceCaptured(true);
					} catch (err) {
						console.log('Error adding event attendance records');
						console.log(err);
					}
				}				

			}

     return (
			<Box component="form" onSubmit={handleAttendance} sx={{ mt: 3 }}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
							<TextField
							required
							fullWidth
							name="attendance"
							label="Number of People Watching"
							id="attendance"
							type='number'
							min='1'
							value={attendance}
							onChange={(e) => handleValidation(e.target.value, setAttendance, setValidAttendance, attendanceRegex)}
							error={!validAttendance}
							/>
					</Grid>
				</Grid>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					disabled={!valid}
					sx={{ mt: 3, mb: 2 }}
				>
					Submit
				</Button>
			</Box>
     )
  }



  return (
    <div style={{padding: 30,}}>
        <Card sx={{ maxWidth: 600, height: '70vh', borderRadius: 0.5, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}} >
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
            { userIsParticipant || emailCaptured ? <AttendanceForm /> : <EmailForm /> }
        </CardContent>
        </Card>
    </div>
  )
}
