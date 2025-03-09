"use client";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'

function page() {

  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    const newDetails = { email: e.target[0].value, password: e.target[1].value };
    setLoginDetails(newDetails);
    console.log(loginDetails);
  }

  return (
    <div className='w-screen min-h-screen flex justify-center items-center'>
      <div className='w-screen overflow-x-hidden items-center flex flex-col gap-4'>
        <h1 className='text-3xl w-[90%] text-start font-semibold'>Login</h1>
        <form action="" onSubmit={handleLogin} className='w-[90%] flex flex-col gap-4'>
          <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} placeholder={'Enter Email ID'} />
          <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} placeholder={'Enter Password'} />
          <Button size={"lg"} type={"submit"} >Login</Button>
        </form>
      </div>
    </div>
  )
}

export default page
