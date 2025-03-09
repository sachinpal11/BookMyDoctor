"use client";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

function page() {


  const [signUpDetails, setSignUpDetails] = useState({ name: '', age: '', mobile: '', email: '', degree: '', experience: '', location: '', password: '' });

  const handleSignUp = (e) => {
    e.preventDefault();
    const newDetails = { name: e.target[0].value, age: e.target[1].value, mobile: e.target[2].value, email: e.target[3].value, degree: e.target[4].value, experience: e.target[5].value, location: e.target[6].value, password: e.target[7].value };
    setSignUpDetails(newDetails);
    console.log(signUpDetails);
  }


  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-screen overflow-x-hidden items-center flex flex-col gap-4'>
        <h1 className='text-3xl w-[90%] text-start font-semibold'>Signup</h1>
        <form action="" onSubmit={handleSignUp} className='w-[90%] flex flex-col gap-4'>
          <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} placeholder={'Enter Name'} />
          <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} placeholder={'Enter Age'} />
          <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} placeholder={'Enter Mobile No'} />
          <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} placeholder={'Enter Email ID'} />
          <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} placeholder={'Enter Doctor Degree'} />
          <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} placeholder={'Enter Doctor Experience'} />
          <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} placeholder={'Enter Clinic Location'} />
          <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} placeholder={'Set Password'} />
          <Button variant={"register"} size={"lg"} type={"submit"} >Sign Up</Button>
        </form>
      </div>
    </div>
  )
}

export default page
