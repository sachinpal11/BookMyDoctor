"use client";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Loading from '@/components/ui/Loading';
import RegisterSuccess from '@/components/ui/RegisterSuccess';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';
import React, { useEffect, useState } from 'react'

function page() {

  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });
  const [loading, setloading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const [loadingVal, setloadingVal] = useState('Login')
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!disabled) {
      try {
        setloading(true);
        const response = await axios.post(`/api/doctor/login`, loginDetails);
        console.log(response.data.error);
        if (response.data.error === "Email is not registered") {
          setloadingVal('Not Login')
        }
        router.push("/profile");
      } catch (error) {
        console.log("error login:", error);
        setloading(false);
      }
      finally {
        setloading(false);
        setSuccess(true);
      }
    }
  }


  useEffect(() => {
    if (loginDetails.email.length > 0 && loginDetails.password.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [loginDetails])
  return (
    <div className='w-screen relative min-h-screen flex justify-center items-center'>
      <div className='w-screen sm:w-[60%] md:w-[40%] overflow-x-hidden items-center flex flex-col gap-4'>
        <h1 className='text-3xl w-[90%] text-start font-semibold'>Login</h1>
        {success && <RegisterSuccess value={loadingVal} />}
        {loading && <Loading />}
        <form action="" onSubmit={handleLogin} className='w-[90%] flex flex-col gap-4'>
          <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value.toLowerCase() })} placeholder={'Enter Email ID'} />
          <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })} type={"password"} placeholder={'Enter Password'} />
          <Button size={"lg"} type={"submit"} >{disabled ? "Fill Details" : "Login"}</Button>
        </form>
      </div>
    </div>
  )
}

export default page
