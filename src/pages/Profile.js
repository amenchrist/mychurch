import React from 'react'
import ProfileForm from '../components/ProfileForm'
import { useMyStore } from '../store'

function Profile() {

  const {user} = useMyStore()

  console.log(user)
  return (
    <div>
      <h1>Profile</h1>
      <ProfileForm data={user} />
    </div>
  )
}

export default Profile