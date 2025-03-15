"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [morningPatients, setMorningPatients] = useState([]);
  const [eveningPatients, setEveningPatients] = useState([]);

  useEffect(async () => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("/api/doctor/patients");
        console.log(res.data);
        setMorningPatients(res.data.morningPatients);
        setEveningPatients(res.data.eveningPatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);


  return (
    <div className="w-full min-h-screen p-5 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-5">Today's Patients</h1>

      {/* Morning Shift Patients */}
      <div className="w-full max-w-4xl mb-10">
        <h2 className="text-2xl font-semibold mb-3">🌅 Morning Shift</h2>
        {morningPatients.length > 0 ? (
          <PatientTable patients={morningPatients} />
        ) : (
          <p className="text-lg text-gray-500">No morning shift patients.</p>
        )}
      </div>

      {/* Evening Shift Patients */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-3">🌙 Evening Shift</h2>
        {eveningPatients.length > 0 ? (
          <PatientTable patients={eveningPatients} />
        ) : (
          <p className="text-lg text-gray-500">No evening shift patients.</p>
        )}
      </div>
    </div>
  );
}

// Reusable Patient Table Component
function PatientTable({ patients }) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-3">Name</th>
          <th className="border p-3">Age</th>
          <th className="border p-3">Mobile</th>
          <th className="border p-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <tr key={patient._id} className="text-center">
            <td className="border p-3">{patient.name}</td>
            <td className="border p-3">{patient.age}</td>
            <td className="border p-3">{patient.mobile}</td>
            <td className="border p-3">
              {patient.appointed ? "✅ Appointed" : "⏳ Waiting"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
