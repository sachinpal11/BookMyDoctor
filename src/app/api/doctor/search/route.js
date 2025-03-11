import connectDB from "@/dbConfig/dbConfig";
import doctorModel from "@/models/doctorModel";
import { NextResponse } from "next/server";

connectDB();

export async function POST(request) {

  try {
    const reqBody = await request.json();

    const { doctorName } = reqBody;

    if (!reqBody) {
      return NextResponse.json({ error: "Search value is required" }, { status: 400 });
    }

    const doctors = await doctorModel.find({ firstName: doctorName });
    return NextResponse.json({ success: true, doctors }, { status: 200 });


  } catch (err) {
    console.error("Error search doctor:", err.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
