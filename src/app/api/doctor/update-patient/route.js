import connectDB from "@/dbConfig/dbConfig";
import patient from "@/models/patient";

export async function PUT(req) {
  await connectDB();

  try {
    const { id } = await req.json(); // Read request body
    const updatedPatient = await patient.findByIdAndUpdate(
      id,
      { appointed: true },
      { new: true }
    );

    if (!updatedPatient) {
      return new Response(JSON.stringify({ error: "Patient not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Appointment updated", patient: updatedPatient }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error updating appointment" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
