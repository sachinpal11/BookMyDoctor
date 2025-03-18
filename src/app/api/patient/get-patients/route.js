
import connectDB from "@/dbConfig/dbConfig";
import Patient from "@/models/patient";

export async function GET(req) {
  await connectDB();
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to start of the day

  try {
    const patients = await Patient.find({ createdAt: { $gte: today } }).sort({ createdAt: 1 }); // Oldest first
    return Response.json(patients);
  } catch (error) {
    return Response.json({ message: "Error fetching patients", error }, { status: 500 });
  }
}
