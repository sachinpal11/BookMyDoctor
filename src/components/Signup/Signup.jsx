import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

function Signup() {
  return (
    <div className='w-screen overflow-x-hidden items-center flex flex-col gap-4'>
      <h1 className='text-3xl w-[90%] text-start font-semibold'>Signup</h1>
      <form action="" className='w-[90%] flex flex-col gap-4'>
        <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} placeholder={'Enter Name'} />
        <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} placeholder={'Enter Age'} />
        <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} placeholder={'Enter Mobile No'} />
        <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} placeholder={'Enter Email ID'} />
        <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} placeholder={'Enter Doctor Degree'} />
        <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} placeholder={'Enter Clinic Location'} />
        <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} placeholder={'Set Password'} />
        <Button variant={"register"} size={"lg"} >Login</Button>

      </form>
    </div>
  )
}

export default Signup
