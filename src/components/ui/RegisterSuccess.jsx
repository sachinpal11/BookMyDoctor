import Link from 'next/link'
import React from 'react'

function RegisterSuccess({ value }) {
  return (
    <div className='w-full flex flex-col h-full absolute top-0 items-center justify-center bg-white '>
      <div className='w-[28vh] h-[28vh] px-10 font-semibold flex flex-col items-center rounded-full text-5xl justify-center text-center bg-white'>Doctor {value} Successfully!</div>
      <Link href={"/doctor-login"} className='font-semibold'>Go to Login</Link>
    </div>
  )
}

export default RegisterSuccess
