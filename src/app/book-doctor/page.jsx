"use client";

import { Button } from '@/components/ui/button';
import DoctorBookSchedule from '@/components/ui/DoctorBookSchedule';
import { Input } from '@/components/ui/input';
import Loading from '@/components/ui/Loading';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'

function BookDoctorComponent() {
  const searchParams = useSearchParams();
  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const [isBookOpen, setBookOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [shift, setShift] = useState(null)
  const router = useRouter();
  const [shifts, setShifts] = useState({
    morning: { startTime: "", endTime: "" },
    evening: { startTime: "", endTime: "" },
  });
  useEffect(() => {
    const doctorid = searchParams.get("book") || "Guest";
    setId(doctorid);
  }, [searchParams]);


  useEffect(() => {
    const getDoctorDetails = async () => {
      try {
        const doctorRes = await axios.post("/api/patient/get-doctor", { id });
        setData(doctorRes.data.doctorData);
        setLoading(false);// Store the whole object
      } catch (error) {
        // console.error("Error fetching doctor details", error);
      }
    };
    const getDoctorSchedule = async () => {
      try {
        const scheduleRes = await axios.post("/api/patient/get-schedule", { id });

        setShifts(scheduleRes.data.scheduleData.shifts); // Store the whole object
      } catch (error) {
        // console.error("Error fetching doctor details", error);
      }
    };

    getDoctorDetails();
    getDoctorSchedule();

  }, [id]);

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/patient/get-appointment', { doctorId: id, name: e.target[0].value, age: e.target[1].value, mobile: e.target[2].value, shift: shift })
      console.log(res.data);
      if (res.data.success) {
        router.push(`/patient-appointment/`);
      }
    } catch (err) {
      console.log("appointment error:", err);
    }
  }

  return (
    <div className='w-full relative sm:w-[60%] md:w-[40%] flex h-screen flex-col items-center justify-start'>
      {isLoading && <Loading />}
      <div className="w-[90%] flex items-center justify-center h-auto py-5 flex-col gap-2 rounded-xl bg-gray-100 mt-5 ">
        <div className="w-[150px] overflow-hidden h-[150px] bg-white rounded-full">
          <img src={data?.image || null} className="w-full h-full object-cover" alt="Doctor Profile" />
        </div>
        <h1 className="text-2xl capitalize font-semibold">
          {data ? `${data.firstName} ${data.lastName}` : "Loading..."}
        </h1>
        <p className="uppercase -mt-2 text-gray-600 text-lg">{data && `${data.degree}`}</p>
        <span className='text-xl font-semibold'>{isBookOpen && shift}</span>
      </div>
      {((shifts.morning.startTime || shifts.evening.startTime) && !isBookOpen) && (
        <>
          <span className='mt-10 w-[90%] font-semibold text-2xl' >Today</span>
          <DoctorBookSchedule shifts={[shifts.morning]} setShift={setShift} setBookOpen={setBookOpen} shift={'morning'} />
          <DoctorBookSchedule shifts={[shifts.evening]} setShift={setShift} setBookOpen={setBookOpen} shift={'evening'} />
        </>
      )
      }
      {
        isBookOpen &&
        <form action={''} onSubmit={handleForm} className='w-[90%] gap-2 mt-5 flex flex-col justify-start items-center'>
          <Input placeholder={'Enter Name'} required className={'py-6 bg-gray-200'} />
          <Input placeholder={'Enter Age'} required className={'py-6 bg-gray-200'} />
          <Input placeholder={'Enter Mobile No.'} required className={'py-6 bg-gray-200'} />
          <Button className={'w-full mt-5'} variant={'register'} type="submit" size={'lg'} >Book Now</Button>
        </form>
      }
    </div >
  )
}





export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookDoctorComponent />
    </Suspense>
  );
}