import { collection, setDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Page } from '../classes';
import { db } from '../config/firebase';
import { useMyStore } from '../store';
import { v4 as uuidv4 } from 'uuid';


function NewPage({setCreatePageMode}) {

    const [ avatarURL, setAvatarURL ] = useState('');
    const [ bannerURL, setBannerURL ] = useState('');
    const [ name, setName ] = useState('');
    const [ handle, setHandle ] = useState('');
    const [ bio, setBio ] = useState('');
    const [ websiteURL, setWebsiteURL ] = useState('');
    const [ liveStreamURL, setLiveStreamURL ] = useState('');
    const [ email, setEmail ] = useState("");
    const [ phoneNumber, setPhoneNumber ] = useState('');
    
    const [ houseNameOrNumber, setHouseNameOrNumber ] = useState('');  
    const [ street, setStreet ] = useState('');  
    const [ cityOrTown, setCityOrTown ] = useState('');  
    const [ state, setState ] = useState('');  
    const [ county, setCounty ] = useState('');  
    const [ country, setCountry ] = useState('');  
    const [ postOrZipCode, setPostOrZipCode ] = useState('');  

    const pagesRef = collection(db, 'pages');
    const { setCurrentPage, toggleAdminMode, user } = useMyStore();
    const navigate = useNavigate();

    const address = { houseNameOrNumber, street, cityOrTown, state, county, country, postOrZipCode }

    const contactInfo = { email, phoneNumber, address };

    const firstFollower = {
        id: user.id,
        isMember: false,
        role: 'ADMINISTRATOR',
        pagePosts: []
    }

    const newPage = {
        id: uuidv4(),
        type: 'CHURCH',
        avatarURL, bannerURL, name, handle, bio, contactInfo, websiteURL, liveStreamURL,
        followers: [firstFollower],
        events: [],
        posts: [],
        bankDetails: [],
        transactions: [],
        chats: [],
        creatorID: user.id,
        creationTimestamp: new Date().getTime()
    }

    const createPage = async () => {

        try {
            console.log(newPage)
            await setDoc(doc(pagesRef, handle), newPage);
            // await updateDoc(doc(db,'userProfiles', user.email), {pages: user.pages.push(newPage.handle)});
            await updateDoc(doc(db,'userProfiles', user.email), {pages: arrayUnion(newPage.handle)
          });
            setCurrentPage(new Page((newPage)));
            console.log('New User Added');
            toggleAdminMode(true);
            navigate('/pages');
        } catch (err) {
            console.log(err);
        }
      }

  return (
    
    <div style={{width: '400px', display: 'flex', flexDirection: 'column', height: '400px'}}>
        <div onClick={() => setCreatePageMode(false)}>{'Back to Pages List'}</div>
        <br/>
      <div style={{width: '400px', display: 'flex', flexDirection: 'column'}}>
        <input required placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input required placeholder="@Handle" onChange={(e) => setHandle(e.target.value)} />      
        <textarea required placeholder="Bio" onChange={(e) => setBio(e.target.value)} />
        <input required placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input required placeholder="Website URL" onChange={(e) => setWebsiteURL(e.target.value)} />
        <input required placeholder="Stream URL" onChange={(e) => setLiveStreamURL(e.target.value)} />
        <input required placeholder="Avatar URL" onChange={(e) => setAvatarURL(e.target.value)} />
        <input required placeholder="Banner URL" onChange={(e) => setBannerURL(e.target.value)} />

        <p>Contact Info</p>
        <input required placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} />
        <input required placeholder="House Name of Number" onChange={(e) => setHouseNameOrNumber(e.target.value)} />
        <input required placeholder="Street" onChange={(e) => setStreet(e.target.value)} />
        <input required placeholder="City/Town" onChange={(e) => setCityOrTown(e.target.value)} />
        <input required placeholder="State" onChange={(e) => setState(e.target.value)} />
        <input required placeholder="County" onChange={(e) => setCounty(e.target.value)} />
        <input required placeholder="Country" onChange={(e) => setCountry(e.target.value)} />
        <input required placeholder="Postcode / Zip code" onChange={(e) => setPostOrZipCode(e.target.value)} />
      </div>
      <button onClick={createPage}> Create Page</button>

    </div>
  )
}

export default NewPage