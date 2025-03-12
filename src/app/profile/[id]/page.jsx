"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logo from "@/assets/BookMyDoctor-logo.png";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import ScheduleTime from "@/components/ui/ScheduleTime";
import { CrossIcon, LogOutIcon, Minimize2 } from "lucide-react";
import { Input } from "@/components/ui/input";

function Page() {
  const router = useRouter();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [doctorId, setId] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [shifts, setShifts] = useState({
    morning: { startTime: "", endTime: "" },
    evening: { startTime: "", endTime: "" },
  });
  const [tempSchedule, setTempSchedule] = useState(shifts);

  const LogOut = async () => {
    try {
      await axios.get("/api/doctor/logout");
      router.push("/doctor-login");
    } catch (error) {
      console.log("logout error", error);
    }
  };

  useEffect(() => {
    setId(id);
    const getDoctorDetails = async () => {
      try {
        const res = await axios.get("/api/doctor/me");
        setData(res.data.data); // Store the whole object
      } catch (error) {
        console.error("Error fetching doctor details", error);
      }
    };

    const getDoctorSchedule = async () => {
      try {
        const res = await axios.get("/api/schedule/get-schedule");
        setShifts(res.data.schedule.shifts);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching doctor details", error);
      }
    };


    getDoctorDetails();
    getDoctorSchedule();

  }, []);

  const handleChange = (shift, field, value) => {
    setTempSchedule((prev) => ({
      ...prev,
      [shift]: { ...prev[shift], [field]: value },
    }));
  };

  const updateSchedule = async () => {
    setShifts(tempSchedule);
    setId(id);
    setOpen(false);
    console.log("Sending Data:", {
      doctorId,
      shifts
    });

    // try { }
    try {
      const response = await axios.post('/api/schedule/doctor-schedule', { doctorId, shifts });
      console.log("API Response:", response.data);
      setOpen(false);
    } catch (error) {
      console.error("Failed to update schedule", error);
    }
  };

  return (
    <div className="w-full relative sm:w-[60%] md:w-[40%] h-screen flex flex-col items-center justify-start">
      <div className="w-full p-2 h-[10vh] justify-between bg-gray-100 flex items-center">
        <Image src={Logo} className="w-[50px]" alt="BookMyDoctor Logo" />
        <Button onClick={LogOut} size={'icon'} className={'scale-125 mr-3'}  ><LogOutIcon className="scale-125" /></Button>
      </div>
      <div className="w-[90%] flex items-center justify-center h-auto py-5 flex-col gap-2 rounded-xl bg-gray-100 mt-5 ">
        <div className="w-[150px] overflow-hidden h-[150px] bg-white rounded-full">
          <img src={data?.image || null} className="w-full h-full object-cover" alt="Doctor Profile" />
        </div>
        <h1 className="text-2xl capitalize font-semibold">
          {data ? `${data.firstName} ${data.lastName}` : "Loading..."}
        </h1>
        <p className="uppercase -mt-2 text-gray-600 text-lg">{data && `${data.degree}`}</p>
      </div>
      <span className="w-[90%] mb-3 text-2xl mt-4 font-semibold">Timing</span>
      {shifts.morning.startTime || shifts.evening.startTime ? (
        <>
          <ScheduleTime shifts={[shifts.morning]} setOpen={setOpen} shift={'Morning'} />
          <ScheduleTime shifts={[shifts.evening]} setOpen={setOpen} shift={'Evening'} />
        </>
      ) : (
        <p className="text-xl font-semibold">No Appointment Timing</p>
      )}
      {shifts.morning.startTime === "" && <Button onClick={() => setOpen(true)} size={'lg'} className={'w-[90%] mt-5'} > Update Timing </Button>}
      <Button size={'lg'} className={'w-[90%] mt-5'} > Patient Management </Button>
      {isOpen && <div className="w-full flex flex-col items-center justify-between h-screen fixed bg-white">
        <Minimize2 className="text-2xl fixed top-5 right-5" onClick={() => { setOpen(false) }} />
        <div className="w-[90%] h-full flex flex-col items-center justify-center gap-3">
          <span className="w-[90%] text-xl font-semibold">Morning</span>
          <Input
            className="bg-gray-100 py-6"
            placeholder="Starts"
            required
            value={tempSchedule.morning.startTime}
            onChange={(e) => handleChange("morning", "startTime", e.target.value)}
          />
          <Input
            className="bg-gray-100 py-6"
            placeholder="Ends"
            required
            value={tempSchedule.morning.endTime}
            onChange={(e) => handleChange("morning", "endTime", e.target.value)}
          />
          <span className="w-[90%] text-xl font-semibold">Evening</span>
          <Input
            className="bg-gray-100 py-6"
            placeholder="Starts"
            required
            value={tempSchedule.evening.startTime}
            onChange={(e) => handleChange("evening", "startTime", e.target.value)}
          />
          <Input
            className="bg-gray-100 py-6"
            placeholder="Ends"
            required
            value={tempSchedule.evening.endTime}
            onChange={(e) => handleChange("evening", "endTime", e.target.value)}
          />
          <Button className={'w-full mt-5'} size={'lg'} onClick={updateSchedule} >Update Appointments</Button>
        </div>
      </div>}
    </div>
  );
}

export default Page;
