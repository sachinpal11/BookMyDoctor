import { Button } from '@/components/ui/button'
import React from 'react'
import Logo from '@/assets/BookMyDoctor-logo.png';
import Image from 'next/image';
import Link from 'next/link';
function page() {
  return (
    <div className='w-screen h-screen  flex-col gap-10 flex justify-center items-center'>
      <div className='flex flex-col w-full sm:w-[60%] justify-center gap-4 items-center'>
        <Image className='w-[60px]' src={Logo} alt={''} />
        <h1 className='text-5xl font-semibold text-center'>Book My <br /> Doctor</h1>
      </div>
      <div className='w-full sm:w-[60%] md:w-[40%] flex flex-col gap-2 items-center'>
        <Link href={'/doctor-register'} className='py-3 px-5 text-center text-xl text-white rounded-md w-[90%] bg-blue-700' >Register As Doctor</Link>
        <Link href={'/search-doctor'} className='py-3 px-5 text-center text-xl text-white rounded-md w-[90%] bg-black' >Search Doctors</Link>
      </div>
    </div>
  )
}

export default page
