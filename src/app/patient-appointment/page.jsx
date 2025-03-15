"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [patientNo, setPatientNo] = useState(null);
  const [currentNo, setCurrentNo] = useState(null);
  const router = useRouter();
  useEffect(() => {
    // Fetch the initial queue
    fetch("/api/patients")
      .then((res) => res.json())
      .then((data) => {
        setPatientNo(data.length); // New patient is last in queue
        const appointedPatients = data.filter((p) => p.appointed);
        setCurrentNo(appointedPatients.length + 1); // Current serving number
      });


    // Real-time updates using SSE
    const eventSource = new EventSource("/api/patient-updates");
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPatientNo(data.length); // Update patient number in queue
      const appointedPatients = data.filter((p) => p.appointed);
      setCurrentNo(appointedPatients.length + 1); // Update current serving number
    };

    return () => eventSource.close();
  }, []);


  const LogOut = async () => {
    try {
      await axios.get("/api/patient/logout");
      router.push("/");
    } catch (error) {
      console.log("patient logout error", error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-10">
      <h1 className="text-3xl font-semibold text-center mx-5">Your Booking is Confirmed</h1>
      <span className="text-xl font-semibold">Patient No.</span>
      <span className="text-9xl font-bold ">{patientNo}</span>
      <span className="text-2xl font-semibold">Current No: {currentNo || "Loading..."}</span>
      {(patientNo <= currentNo) &&
        <div className="w-full flex flex-col items-center font-semibold gap-4">
          Did you Take Your Appointment?
          <Button variant={'destructive'} onClick={LogOut}  >Log Out</Button>
        </div>
      }
    </div>
  );
}
