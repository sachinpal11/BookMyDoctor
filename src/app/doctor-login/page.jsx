"use client";

import { Button } from '@/components/ui/button';
import Login from '@/components/login/Login';
import React, { useState } from 'react'
import Signup from '@/components/Signup/Signup';

function page() {
  const [isLogin, setLogin] = useState(false);
  const [isSignUp, setSignUp] = useState(false);
  return (
    <div className='w-screen gap-4 flex-col h-screen flex justify-center items-center'>
      {!isLogin && !isSignUp && < h1 className='text-5xl mb-5 font-semibold text-center'>Doctor <br /> Registration</h1>}

      {isLogin && <Login />}
      {isSignUp && <Signup />}

      {
        !isSignUp &&
        <Button className={'w-[90%]'} variant={"register"} onClick={() => setSignUp(true)} size={"lg"} > Register</Button>
      }
      {
        !isLogin &&
        <Button className={'w-[90%]'} onClick={() => setLogin(true)} size={"lg"} >Login</Button>
      }

    </div >
  )
}

export default page
