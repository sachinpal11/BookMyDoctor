
import connectDB from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import patient from "@/models/patient";

export async function GET(req) {
  try {
    await connectDB();
    const doctorId = getDataFromToken(req);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch morning shift patients
    const morningPatients = await patient.find({
      doctorId,
      shift: "morning",
      createdAt: { $gte: today },
    }).sort({ createdAt: 1 });

    // Fetch evening shift patients
    const eveningPatients = await patient.find({
      doctorId,
      shift: "evening",
      createdAt: { $gte: today },
    }).sort({ createdAt: 1 });
    console.log(morningPatients, eveningPatients);
    return Response.json({ morningPatients, eveningPatients });
  } catch (error) {
    return Response.json({ error: "Failed to fetch patients" }, { status: 500 });
  }
}
