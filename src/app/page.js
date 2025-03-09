import { Button } from '@/components/ui/button'
import React from 'react'
import Logo from '@/assets/BookMyDoctor-logo.png';
import Image from 'next/image';
function page() {
  return (
    <div className='w-screen h-screen flex-col gap-10 flex justify-center items-center'>
      <div className='flex flex-col gap-4 items-center'>
        <Image className='w-[60px]' src={Logo} alt={''} />
        <h1 className='text-5xl font-semibold text-center'>Book My <br /> Doctor</h1>
      </div>
      <div className='w-full flex flex-col gap-2 items-center'>
        <Button className={'w-[90%]'} variant={"register"} size={"lg"}>Register As Doctor</Button>
        <Button className={'w-[90%]'} size={"lg"}>Search Doctors</Button>
      </div>
    </div>
  )
}

export default page
