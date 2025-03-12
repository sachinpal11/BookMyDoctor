"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logo from "@/assets/BookMyDoctor-logo.png";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const { id } = useParams();
  const [data, setData] = useState(null);

  const LogOut = async () => {
    try {
      await axios.get("/api/doctor/logout");
      router.push("/doctor-login");
    } catch (error) {
      console.log("logout error", error);
    }
  };

  useEffect(() => {
    const getDoctorDetails = async () => {
      try {
        const res = await axios.get("/api/doctor/me");
        setData(res.data.data); // Store the whole object
      } catch (error) {
        console.error("Error fetching doctor details", error);
      }
    };

    getDoctorDetails();
  }, []);

  return (
    <div className="w-full sm:w-[60%] md:w-[40%] h-screen flex flex-col items-center justify-start">
      <div className="w-full p-2 h-[10vh] justify-between bg-gray-300 flex items-center">
        <Image src={Logo} className="w-[50px]" alt="BookMyDoctor Logo" />
        <Button onClick={LogOut}>Log Out</Button>
      </div>
      <div className="w-[90%] flex items-center justify-center h-auto py-5 flex-col gap-4 rounded-xl bg-gray-200 mt-5 ">
        <div className="w-[180px] overflow-hidden h-[180px] bg-white rounded-full">
          <img src={data?.image || ""} className="w-full h-full object-cover" alt="Doctor Profile" />
        </div>
        <h1 className="text-2xl capitalize font-semibold">
          {data ? `${data.firstName} ${data.lastName}` : "Loading..."}
        </h1>
      </div>
    </div>
  );
}

export default Page;
