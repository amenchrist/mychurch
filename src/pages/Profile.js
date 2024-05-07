import React from 'react'
import ProfileForm from '../components/ProfileForm'
import { useMyStore } from '../store'
import ChurchProfile from '../components/Profile/ChurchProfile'
import UserProfile from '../components/Profile/UserProfile'

function Profile() {

  const { currentPage } = useMyStore()


  switch(currentPage.type){
    case 'CHURCH':
      return <ChurchProfile />;
    case 'PERSON':
      return <UserProfile />
    default:
      return <UserProfile />
  }
}

export default Profile