
import connectDB from "@/dbConfig/dbConfig";
import Patient from "@/models/patient";

export async function GET(req) {
  await connectDB();

  try {
    const patients = await Patient.find({}).sort({ createdAt: 1 }); // Oldest first
    return Response.json(patients);
  } catch (error) {
    return Response.json({ message: "Error fetching patients", error }, { status: 500 });
  }
}
