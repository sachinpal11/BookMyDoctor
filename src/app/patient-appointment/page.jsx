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
    const fetchPatientData = async () => {
      try {
        const res = await axios.get("/api/patient/me");
        setPatientNo(res.data.patientNo);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchQueueData = async () => {
      try {
        const res = await fetch("/api/patient/get-patient");
        const data = await res.json();
        const appointedPatients = data.filter((p) => p.appointed);
        setCurrentNo(appointedPatients.length + 1);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPatientData();
    fetchQueueData();

    // Real-time updates for current queue but NOT patientNo
    const eventSource = new EventSource("/api/patient-updates");
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const appointedPatients = data.filter((p) => p.appointed);
      setCurrentNo(appointedPatients.length + 1);
    };

    return () => {
      eventSource.close(); // Cleanup the event listener
    };
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
      <span className="text-9xl font-bold">{patientNo}</span>
      <span className="text-2xl font-semibold">Current No: {currentNo || "Loading..."}</span>
      {(patientNo <= currentNo) && (
        <div className="w-full flex flex-col items-center font-semibold gap-4">
          Did you Take Your Appointment?
          <Button variant={"destructive"} onClick={LogOut}>
            Log Out
          </Button>
        </div>
      )}
    </div>
  );
}
