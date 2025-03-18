
import connectDB from "@/dbConfig/dbConfig";
import { getDataFromPatient } from "@/helpers/getDataFromPatient";
import patient from "@/models/patient";


export async function GET(req) {
  await connectDB();

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to start of the day

  const patientData = await getDataFromPatient(req);
  const { doctorId } = patientData;
  return new Response(
    new ReadableStream({
      async start(controller) {
        const sendUpdates = async () => {
          const patients = await patient.find({ doctorId, createdAt: { $gte: today } }).sort({ createdAt: 1 });
          controller.enqueue(`data: ${JSON.stringify(patients)}\n\n`);
        };

        sendUpdates();

        const interval = setInterval(sendUpdates, 2000); // Check every 2 seconds
        req.signal.addEventListener("abort", () => clearInterval(interval));
      }
    }),
    {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive"
      }
    }
  );
}
