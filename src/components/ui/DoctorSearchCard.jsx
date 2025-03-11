import { BookAIcon, LocateIcon, MapIcon, MapPinIcon } from 'lucide-react';
import React from 'react'
import { Button } from './button';

function DoctorSearchCard({ name, image, degree, location }) {

  const doctor_name = "sachin";
  return (

    <div className='w-[95%] capitalize relative flex rounded-lg items-center gap-4 bg-gray-200 h-auto px-2 py-2 '>
      <img src={image} className='w-[30%] h-full object-cover rounded-lg' alt="" />
      <div className='w-[60%] h-full items-center'>
        <h1 className='text-2xl font-semibold capitalize '>Dr. {name}</h1>
        <p className='text-xl uppercase flex items-center'> {degree}</p>
        <span className='flex text-gray-600 items-center text-xl'> {location}</span>
      </div>
      <Button className="h-full" >Book</Button>
    </div>
  )
}

export default DoctorSearchCard
