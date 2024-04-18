import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useMyStore } from "../store";
import { collection, setDoc, doc } from "firebase/firestore";
import {  useNavigate } from "react-router-dom";
import { Address, BioData, ContactInfo, User } from "../classes";
import { v4 as uuidv4 } from 'uuid';
import { userConverter } from "../firebaseConverters";
import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';



export const SignUpForm = () => {

  const { setUser, currentPage } = useMyStore();
  // const userProfilesRef = collection(db, 'userProfiles');

  //New User Authentication states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //New User Profile States
  const [ title, setTitle ] = useState("");
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ role, setRole ] = useState("SUBSCRIBER");
  const [ disabled, setDisabled ] = useState(true);

  const [ middleName, setMiddleName ] = useState('');
  const [ gender, setGender ] = useState('');
  const [ dateOfBirth, setDateOfBirth ] = useState('');
  const [ maritalStatus, setMaritalStatus ] = useState('');
  const [ nationality, setNationality ] = useState('');
  const [ phoneNumber, setPhoneNumber ] = useState('');
  const [ houseNameOrNumber, setHouseNameOrNumber ] = useState('');  
  const [ street, setStreet ] = useState('');  
  const [ cityOrTown, setCityOrTown ] = useState('');  
  const [ state, setState ] = useState('');  
  const [ county, setCounty ] = useState('');  
  const [ country, setCountry ] = useState('');  
  const [ postOrZipCode, setPostOrZipCode ] = useState('');  

  
  // const address = new Address({ houseNameOrNumber, street, cityOrTown, state, county, country, postOrZipCode })
  const address = { houseNameOrNumber, street, cityOrTown, state, county, country, postOrZipCode }

  // const bioData = new BioData({ title, firstName, middleName, lastName, gender, dateOfBirth, maritalStatus, nationality })
  const bioData = { title, firstName, middleName, lastName, gender, dateOfBirth, maritalStatus, nationality }

  // const contactInfo = new ContactInfo({ email, phoneNumber, address })
  const contactInfo = { email, phoneNumber, address }

  // const newUser = { title, firstName, lastName, role }

  const newUser = {
    id: `user_${uuidv4()}`,
    bioData,
    contactInfo,
    pages: [currentPage?.id],
    likedPosts: [],
    savedPosts: [],
    events: [],
    notes: [],
    reviews: [],
    type: 'USER'
  }

  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault()
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await addUser(newUser);
      const nUser = new User(newUser)
      setUser({...userCred.user, ...nUser});
      navigate('/');
    } catch (err) {
      console.error(err);
    }

  };

  const addUser = async () => {
    try {
      await setDoc(doc(db, 'userProfiles', email), newUser);
      console.log('New User Added')
    } catch (err) {
      console.log('Error adding user')
      console.log(err);
    }
  }

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="#">
          Evangel
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <Container component="main" maxWidth="xs" sx={{}}>
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',height:'80%' }} >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
        <Typography component="h1" variant="h5">Sign up</Typography>
        <Box component="form" onSubmit={signUp} sx={{ mt: 3,  height:'100%', overflowY: 'auto'}}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField required fullWidth id="email" label="Email Address" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth  label="Password" type="password" id="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField autoFocus required fullWidth autoComplete="given-name" label="First Name" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required fullWidth autoComplete="family-name" label="Last Name" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth disabled name="Role" label="Role" type="text" id="Role" value={role} onChange={(e) => setRole(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Gender" type="text" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Date of Birth" type="text" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Marital Status" type="text" id="maritalStatus" value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Nationality" type="text" id="nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} />
            </Grid>
            <hr />
            <Grid item xs={12}>
              <Typography>Contact Info</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth label="Phone Number" type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="House Name of Number" type="text" id="houseNameOrNumber" value={houseNameOrNumber} onChange={(e) => setHouseNameOrNumber(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Street" type="text" id="street" value={street} onChange={(e) => setStreet(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="City/Town" type="text" id="cityOrTown" value={cityOrTown} onChange={(e) => setCityOrTown(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="State" type="text" id="state" value={state} onChange={(e) => setState(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="County" type="text" id="county" value={county} onChange={(e) => setCounty(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Country" type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Postcode / Zip code" type="text" id="postOrZipCode" value={postOrZipCode} onChange={(e) => setPostOrZipCode(e.target.value)} />
            </Grid>

          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Sign Up</Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
    // <div style={{width: '400px', display: 'flex', flexDirection: 'column', height: '400px'}}>
    //   <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
    //   <input placeholder="Password..." type="password" onChange={(e) => setPassword(e.target.value)} />
    //   <br />
    //   <div style={{width: '400px', display: 'flex', flexDirection: 'column'}}>
    //     <input required placeholder="Title..." onChange={(e) => setTitle(e.target.value)} />      
    //     <input required placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
    //     <input required placeholder="Middle Name" onChange={(e) => setMiddleName(e.target.value)} />
    //     <input required placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
    //     <input required placeholder="Role" value={role} disabled={disabled} onChange={(e) => setRole(e.target.value)} onClick={() => setDisabled(false)}/>
    //     <input required placeholder="Gender" onChange={(e) => setGender(e.target.value)} />
    //     <input required placeholder="Date of Birth" onChange={(e) => setDateOfBirth(e.target.value)} />
    //     <input required placeholder="Marital Status" onChange={(e) => setMaritalStatus(e.target.value)} />
    //     <input required placeholder="Nationality" onChange={(e) => setNationality(e.target.value)} />

    //     <p>Contact Info</p>
    //     <input required placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} />
    //     <input required placeholder="House Name of Number" onChange={(e) => setHouseNameOrNumber(e.target.value)} />
    //     <input required placeholder="Street" onChange={(e) => setStreet(e.target.value)} />
    //     <input required placeholder="City/Town" onChange={(e) => setCityOrTown(e.target.value)} />
    //     <input required placeholder="State" onChange={(e) => setState(e.target.value)} />
    //     <input required placeholder="County" onChange={(e) => setCounty(e.target.value)} />
    //     <input required placeholder="Country" onChange={(e) => setCountry(e.target.value)} />
    //     <input required placeholder="Postcode / Zip code" onChange={(e) => setPostOrZipCode(e.target.value)} />
    //   </div>
    //   <button onClick={signUp}> Sign Up</button>
    //   <a href='/'>I'm Registered</a>
    // </div>
  );
}

