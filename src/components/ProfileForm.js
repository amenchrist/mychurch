import React, {useState} from 'react';

function ProfileForm({data}) {

    const [ email, setEmail ] = useState(data.email);
    const [ title, setTitle ] = useState(data.title);
    const [ firstName, setFirstName ] = useState(data.firstName);
    const [ lastName, setLastName ] = useState(data.lastName);

    const updateProfile = () => {

    }


  return (
    <div style={{width: '400px', display: 'flex', flexDirection: 'column'}}>
      <input value={email} placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
      <input value={title} placeholder="Title..." onChange={(e) => setTitle(e.target.value)} />      
      <input value={firstName} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
      <input value={lastName} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
      <button onClick={updateProfile}> Update Profile</button>

    </div>
  )
}

export default ProfileForm