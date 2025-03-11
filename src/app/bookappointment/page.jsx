'use client'


import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { SearchIcon, SearchXIcon } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

function page() {

  const [searchVal, setSearchVal] = useState('');
  const searchRef = useRef(null);
  const [disable, setDisable] = useState(true);
  const handleSearchForm = async (e) => {
    e.preventDefault();

    try {
      console.log(searchRef.current.value);
      const response = await axios.post(`/api/doctor/search`, { doctorName: searchRef.current.value });
      console.log("searching success", response.data.doctors);
    } catch (error) {
      console.log("error searching:", error);
    }

  }

  useEffect(() => {
    if (searchVal.length > 0) {
      setDisable(false);
    }
    else {
      setDisable(true);
    }
  }, [searchVal])

  return (
    <div className='w-screen sm:w-[60%] md:w-[40%] gap-5 flex-col h-screen flex justify-center items-center'>
      <h1 className='text-5xl font-semibold text-center'>Book Your <br /> Doctor Online</h1>
      <form action="" onSubmit={handleSearchForm} className='w-[90%] gap-4 items-center h-auto flex flex-col mt-5'>
        <div className='bg-neutral-200 rounded-sm w-full py-1 flex items-center px-4'>
          <SearchIcon className='text-gray-500' />
          <input ref={searchRef} onChange={(e) => setSearchVal(e.target.value)} type="text" className={'w-full text-xl outline-none py-2 px-4 bg-gray-200'} placeholder='Search your Doctor' />
        </div>
        <Button className={'w-full font-normal text-xl'} type={'submit'} size={'lg'} >{disable ? "Enter Doctor Name" : "Search"}</Button>
      </form>
    </div>
  )
}

export default page
