"use client";

import DoctorSearchCard from "@/components/ui/DoctorSearchCard";
import Loading from "@/components/ui/Loading";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function DoctorSearchComponent() {
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [doctorData, setDoctorData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doctorName = searchParams.get("name") || "Guest";
    setName(doctorName);
  }, [searchParams]);

  useEffect(() => {
    if (!name || name === "Guest") return;

    const fetchDoctors = async () => {
      try {
        const response = await axios.post(`/api/doctor/search`, { doctorName: name });
        setLoading(false);
        setDoctorData(response.data.doctors);
      } catch (error) {
        console.log("Error searching:", error);
      }
    };

    fetchDoctors();
    const interval = setInterval(fetchDoctors, 2000);

    return () => clearInterval(interval);
  }, [name]);

  return (
    <div className="flex sm:w-[60%] md:w-[40%] w-full flex-col items-center h-full justify-start">
      <h1 className="mt-5 text-2xl font-semibold w-[90%] text-start mb-5">Your Searched: {name}</h1>
      {loading && <Loading />}
      <div className="w-full flex flex-col gap-2 items-center h-auto">
        {doctorData.length > 0 ? (
          doctorData.map((doctor, index) => (
            <DoctorSearchCard
              key={index}
              name={doctor.name}
              image={doctor.image}
              degree={doctor.degree}
              location={doctor.location}
            />
          ))
        ) : (
          <p className="text-xl font-semibold">No doctors found.</p>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DoctorSearchComponent />
    </Suspense>
  );
}
