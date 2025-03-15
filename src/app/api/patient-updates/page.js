
import connectDB from "@/dbConfig/dbConfig";
import Patient from "@/models/patientModel";

export async function GET(req) {
  await connectDB();

  return new Response(
    new ReadableStream({
      async start(controller) {
        const sendUpdates = async () => {
          const patients = await Patient.find().sort({ createdAt: 1 });
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
