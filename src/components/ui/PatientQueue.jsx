"use client";
import { useEffect, useState } from "react";

export default function PatientQueue() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch initial queue
    fetch("/api/patients")
      .then(res => res.json())
      .then(data => setPatients(data));

    // Real-time updates using SSE
    const eventSource = new EventSource("/api/patient-updates");
    eventSource.onmessage = (event) => {
      setPatients(JSON.parse(event.data));
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Patient Queue</h2>
      <ul className="space-y-2">
        {patients.map((patient, index) => (
          <li key={patient._id} className="p-2 border rounded-md">
            <span className="font-semibold">{index + 1}.</span> {patient.name} ({patient.shift})
          </li>
        ))}
      </ul>
    </div>
  );
}
