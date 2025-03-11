"use client";

import DoctorSearchCard from '@/components/ui/DoctorSearchCard';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function Page() {
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    const doctorName = searchParams.get('name') || 'Guest';
    setName(doctorName);
  }, [searchParams]);

  useEffect(() => {
    if (!name || name === 'Guest') return;

    const fetchDoctors = async () => {
      try {
        console.log("Searching for:", name);
        const response = await axios.post(`/api/doctor/search`, { doctorName: name });
        console.log("Search success:", response.data.doctors);
        setDoctorData(response.data.doctors);
      } catch (error) {
        console.log("Error searching:", error);
      }
    };

    fetchDoctors();
    const interval = setInterval(fetchDoctors, 5000);

    return () => clearInterval(interval);
  }, [name]);

  return (
    <div className='flex flex-col items-center h-full justify-start'>
      <h1 className='mt-5 text-2xl font-semibold w-[90%] text-start mb-5'>Your Searched: {name}</h1>
      <div className='w-full flex flex-col gap-2 justify-center items-center h-auto'>
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
          <p>No doctors found.</p>
        )}
      </div>
    </div>
  );
}

export default Page;
