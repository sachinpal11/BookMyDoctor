"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [patientNo, setPatientNo] = useState(null);
  const [currentNo, setCurrentNo] = useState(null);

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

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-10">
      <h1 className="text-5xl font-semibold text-center mx-5">Your Booking is Confirmed</h1>
      <span className="text-xl font-semibold">Patient No.: {patientNo || "Loading..."}</span>
      <span className="text-2xl font-semibold">Current No: {currentNo || "Loading..."}</span>
    </div>
  );
}
