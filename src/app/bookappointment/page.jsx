'use client'


import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchIcon, SearchXIcon } from 'lucide-react'
import React, { useRef } from 'react'

function page() {

  const DoctorSearchRef = useRef();

  const handleSearchForm = (e) => {
    e.preventDefault();
    console.log(DoctorSearchRef.current.value);
    DoctorSearchRef.current.value = "";
  }

  return (
    <div className='w-screen gap-5 flex-col h-screen flex justify-center items-center'>
      <h1 className='text-5xl font-semibold text-center'>Book Your <br /> Doctor Online</h1>
      <form action="" onSubmit={handleSearchForm} className='w-[90%] gap-4 items-center h-auto flex flex-col mt-5'>
        <div className='bg-neutral-200 rounded-sm w-full py-1 flex items-center px-4'>
          <SearchIcon className='text-gray-500' />
          <input ref={DoctorSearchRef} type="text" className={'w-full text-xl outline-none py-2 px-4 bg-gray-200'} placeholder='Search your Doctor' />
        </div>
        <Button className={'w-full font-normal text-xl'} type={'submit'} size={'lg'} >Search</Button>
      </form>
    </div>
  )
}

export default page
