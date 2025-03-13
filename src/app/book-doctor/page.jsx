"use client";

import DoctorBookSchedule from '@/components/ui/DoctorBookSchedule';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'

function BookDoctorComponent() {
  const searchParams = useSearchParams();
  const [id, setId] = useState("");
  const [data, setData] = useState(null);
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
        setData(doctorRes.data.doctorData); // Store the whole object
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


  return (
    <div className='w-full flex flex-col items-center justify-start'>

      <div className="w-[90%] flex items-center justify-center h-auto py-5 flex-col gap-2 rounded-xl bg-gray-100 mt-5 ">
        <div className="w-[150px] overflow-hidden h-[150px] bg-white rounded-full">
          <img src={data?.image || null} className="w-full h-full object-cover" alt="Doctor Profile" />
        </div>
        <h1 className="text-2xl capitalize font-semibold">
          {data ? `${data.firstName} ${data.lastName}` : "Loading..."}
        </h1>
        <p className="uppercase -mt-2 text-gray-600 text-lg">{data && `${data.degree}`}</p>
      </div>
      {shifts.morning.startTime || shifts.evening.startTime ? (
        <>
          <span className='mt-10 w-[90%] font-semibold text-2xl' >Today</span>
          <DoctorBookSchedule shifts={[shifts.morning]} shift={'Morning'} />
          <DoctorBookSchedule shifts={[shifts.evening]} shift={'Evening'} />
        </>
      ) : (
        <p className="text-xl font-semibold">No Appointment Timing</p>
      )
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