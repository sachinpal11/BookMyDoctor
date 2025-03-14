import { BookAIcon, LocateIcon, MapIcon, MapPinIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import { Button } from './button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function DoctorSearchCard({ firstName, id, lastName, image, degree, location }) {

  const router = useRouter();
  useEffect(() => {
    console.log(id);
  }, [])
  const changeRoute = (id) => {
    router.push(`/book-doctor/?book=${id}`);
  }
  return (

    <div className='w-[95%] capitalize relative flex rounded-lg items-center justify-between gap-4 bg-gray-200 h-auto px-1 py-1 '>
      <img src={image} className='w-[80px] h-[80px] object-cover rounded-lg' alt="" />
      <div className='h-full items-center justify-center'>
        <h1 className='text-lg font-semibold capitalize '>Dr. {firstName} {lastName}</h1>
        <p className='text-lg uppercase flex items-center'> {degree}</p>
        <span className='flex text-gray-600 items-center text-lg'> {location}</span>
      </div>
      <Button className="h-full" onClick={() => changeRoute(id)} >Book</Button>
    </div>
  )
}

export default DoctorSearchCard
