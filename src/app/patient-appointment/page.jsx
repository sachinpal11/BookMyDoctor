import React from 'react'

function page() {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center gap-10'>
      <h1 className='text-5xl font-semibold text-center mx-5'>Your Booking is Confirmed</h1>
      <span className='text-xl font-semibold'>Patient No.: </span>

      <span className='text-2xl font-semibold'>Current No :</span>
    </div>
  )
}

export default page
