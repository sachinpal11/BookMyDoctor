"use client";

import Link from 'next/link'
import React, { useEffect } from 'react'
import { Button } from './button'

function ScheduleTime({ shifts, shift, setBookOpen, setShift }) {


  const handleChange = () => {
    setShift(shift);
    setBookOpen(true);
  }

  return (
    <div className='w-[90%] rounded-sm bg-gray-100 flex mt-3'>
      <div className='bg-gray-100 text-wrap py-2 w-full h-full flex flex-col items-start px-5 text-xl'>
        <p className=''>
          {shifts[0].startTime} - {shifts[0].endTime}
        </p>
        <span className='text-lg capitalize text-gray-600'>{shift}</span>
      </div>
      <Button className={'h-full'} onClick={handleChange} size={'lg'}>Book Now</Button>
    </div>
  )
}

export default ScheduleTime
