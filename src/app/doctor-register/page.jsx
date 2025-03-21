"use client";

import { Button } from '@/components/ui/button';

import React, { useState } from 'react'

import Link from 'next/link';

function page() {

  return (
    <div className='w-full sm:w-[60%] md:w-[40%] overflow-hidden gap-2 flex-col h-screen flex justify-center items-center'>
      < h1 className='text-5xl mb-5 font-semibold text-center'>Doctor <br /> Registration</h1>
      <Link className='w-full flex justify-center' href="/doctor-signup">
        <Button className={'w-[90%]'} variant={"register"} size={"lg"} >Sign Up</Button> </Link>
      <Link className='w-full flex justify-center' href="/doctor-login">
        <Button className={'w-[90%]'} size={"lg"} >Login</Button>
      </Link>
    </div >
  )
}

export default page
