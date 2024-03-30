import React, { useState } from 'react'
import { SignInForm } from '../components/SignInForm';
import { SignUpForm } from '../components/SignUpForm';

function OldSignInPage() {

    const [ isRegistered, setIsRegistered ] = useState(true);
    
  return (
    <div>
        {isRegistered? <SignInForm setIsRegistered={setIsRegistered} /> : <SignUpForm setIsRegistered={setIsRegistered} />}
    </div>
  )
}

export default OldSignInPage