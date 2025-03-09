

import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

function Login() {
  return (
    <div className='w-screen overflow-x-hidden items-center flex flex-col gap-4'>
      <h1 className='text-3xl w-[90%] text-start font-semibold'>Login</h1>
      <form action="" className='w-[90%] flex flex-col gap-4'>
        <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} placeholder={'Enter Email ID'} />
        <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} placeholder={'Enter Password'} />
        <Button size={"lg"}>Login</Button>
      </form>
    </div>
  )
}

export default Login
