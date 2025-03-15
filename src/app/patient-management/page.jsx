"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [morningPatients, setMorningPatients] = useState([]);
  const [eveningPatients, setEveningPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("/api/doctor/patients");
        setMorningPatients(res.data.morningPatients);
        setEveningPatients(res.data.eveningPatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  // Function to handle appointment update
  const updateAppointment = async (id) => {
    try {
      const res = await axios.put(`/api/doctor/update-patient/`, {
        id: id,
      });

      if (res.status === 200) {
        alert("Appointment updated successfully!");
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  return (
    <div className="w-full min-h-screen p-5 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-5">Today's Patients</h1>

      {/* Morning Shift Patients */}
      <div className="w-full max-w-4xl mb-10">
        <h2 className="text-2xl font-semibold mb-3">🌅 Morning Shift</h2>
        {morningPatients.length > 0 ? (
          <PatientTable patients={morningPatients} updateAppointment={updateAppointment} />
        ) : (
          <p className="text-lg text-gray-500">No morning shift patients.</p>
        )}
      </div>

      {/* Evening Shift Patients */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-3">🌙 Evening Shift</h2>
        {eveningPatients.length > 0 ? (
          <PatientTable patients={eveningPatients} updateAppointment={updateAppointment} />
        ) : (
          <p className="text-lg text-gray-500">No evening shift patients.</p>
        )}
      </div>
    </div>
  );
}

// Reusable Patient Table Component
function PatientTable({ patients, updateAppointment }) {
  return (
    <div className="w-full h-auto flex items-center flex-col gap-2">
      {patients.map((patient, index) => (
        <div key={patient._id} className="w-[95%] font-semibold justify-between flex rounded-xl h-auto bg-gray-200 py-5 px-5">
          <span className="text-2xl font-bold">{index + 1}</span>
          <span className="text-xl capitalize">{patient.name}</span>
          <span className="capitalize">Age: {patient.age}</span>
        </div>
      ))}
    </div>
  );
}
