import connectDB from "@/dbConfig/dbConfig";
import doctorModel from "@/models/doctorModel";
import { NextResponse } from "next/server";

connectDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { doctorName } = reqBody;

    if (!doctorName) {
      return NextResponse.json({ error: "Search value is required" }, { status: 400 });
    }

    const doctors = await doctorModel
      .find(
        { firstName: new RegExp(`^${doctorName}`, "i") },
        "image firstName lastName location degree"
      )
      .limit(10)
      .lean();

    return NextResponse.json({ success: true, doctors }, { status: 200 });

  } catch (err) {
    console.error("Error searching doctor:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
