"use client";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Loading from '@/components/ui/Loading';
import RegisterSuccess from '@/components/ui/RegisterSuccess';
import axios from 'axios';
import { CldUploadWidget } from 'next-cloudinary';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function page() {
  const [signUpDetails, setSignUpDetails] = useState({ firstName: '', lastName: '', age: '', mobile: '', email: '', degree: '', experience: '', location: '', password: '', image: '' });

  const [loading, setloading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [success, setSuccess] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);




  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("signup details", signUpDetails);
    if (!disabled) {
      try {
        setloading(true);
        const response = await axios.post(`/api/doctor/signup`, signUpDetails);
        console.log("signup success", response.data);
        setSuccess(true);
      } catch (err) {
        console.log("error", err);
        setloading(false);
        toast.error("Something went wrong");
      } finally {
        setloading(false);
      }
    }

  }


  useEffect(() => {
    if (signUpDetails.email.length > 0 && signUpDetails.password.length > 0 && signUpDetails.firstName.length > 0 && signUpDetails.age.length > 0 && signUpDetails.mobile.length > 0 && signUpDetails.degree.length > 0 && signUpDetails.experience.length > 0 && signUpDetails.location.length > 0) {
      setDisabled(false);
    }
    else {
      setDisabled(true);
    }
  }, [signUpDetails]);


  const handleName = (e) => {
    const name = e.target.value.split(' ');
    if (name.length > 1) {
      setSignUpDetails({ ...signUpDetails, firstName: name[0].toLowerCase(), lastName: name[1].toLowerCase() });
    } else {
      setSignUpDetails({ ...signUpDetails, firstName: name[0].toLowerCase() });
    }
  }
  return (
    <div className='w-screen relative overflow-hidden h-screen flex justify-center items-center'>
      <div className='w-screen sm:w-[60%] md:w-[40%] overflow-x-hidden items-center flex flex-col gap-4'>
        <h1 className='text-3xl w-[90%] text-start font-semibold'>Signup</h1>
        {loading && <Loading />}
        {success && <RegisterSuccess value={"register"} />}
        <form action="" onSubmit={handleSignUp} className='w-[90%] justify-center flex flex-col gap-2'>
          <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} onChange={(e) => handleName(e)} placeholder={'Enter Name'} />
          <CldUploadWidget uploadPreset='book-my-doctor-api-sachin' onSuccess={({ event, info }) => {
            if (event === 'success') {
              console.log(info.secure_url);
              setSignUpDetails(prevDetails => ({ ...prevDetails, image: info.secure_url }));
              setImageUpload(true);
            }
          }} >
            {
              ({ open }) =>
                <button onClick={open} className='bg-gray-300 text-gray-600 py-4 px-6 rounded-lg'>
                  {imageUpload ? "image Uploaded" : "Upload Image"}
                </button>
            }
          </CldUploadWidget>
          <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} onChange={(e) => setSignUpDetails({ ...signUpDetails, age: e.target.value })} placeholder={'Enter Age'} />
          <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} onChange={(e) => setSignUpDetails({ ...signUpDetails, mobile: e.target.value })} placeholder={'Enter Mobile No'} />
          <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} onChange={(e) => setSignUpDetails({ ...signUpDetails, email: e.target.value })} placeholder={'Enter Email ID'} />
          <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} onChange={(e) => setSignUpDetails({ ...signUpDetails, degree: e.target.value })} placeholder={'Enter Doctor Degree'} />
          <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} onChange={(e) => setSignUpDetails({ ...signUpDetails, experience: e.target.value })} placeholder={'Enter Doctor Experience'} />
          <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} onChange={(e) => setSignUpDetails({ ...signUpDetails, location: e.target.value })} placeholder={'Enter Clinic Location'} />



          <Input className={'bg-gray-200 w-full py-6 px-4 text-lg'} onChange={(e) => setSignUpDetails({ ...signUpDetails, password: e.target.value })} placeholder={'Set Password'} type="password" />
          <Button variant={"register"} size={"lg"} type={"submit"} >{disabled ? "Fill All Details" : "Sign Up"}</Button>
          <Link href={'/doctor-login'} className='font-semibold w-full text-center' >Logged In ? Go to LogIn</Link>
        </form>
      </div>
    </div>
  )
}

export default page
