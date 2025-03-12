"use client";

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import Logo from '@/assets/BookMyDoctor-logo.png'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function page() {
  const router = useRouter();
  const LogOut = async () => {
    try {
      await axios.get('api/doctor/logout');
      router.push('/doctor-login');

    } catch (error) {

      console.log("logout error", error)
    }

  }
  return (
    <div className='w-full h-screen flex flex-col items-center justify-start'>
      <div className='w-full p-2 h-[10vh] justify-between bg-gray-300 flex items-center'>
        <Image src={Logo} className='w-[50px]' />
        <Button onClick={LogOut} >Log Out</Button>
      </div>
      <div className='w-[90%] flex items-center justify-center h-[40vh] rounded-xl bg-gray-200 mt-5 '>
        <div className='w-[240px] overflow-hidden h-[240px] bg-white rounded-full '>
          <img src={''} className='w-full h-full object-cover' alt="" />
        </div>
      </div>
    </div>
  )
}

export default page
