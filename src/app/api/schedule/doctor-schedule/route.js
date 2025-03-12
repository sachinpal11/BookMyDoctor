import connectDB from "@/dbConfig/dbConfig";
import doctorSchedule from "@/models/doctorSchedule";
import { NextResponse } from "next/server";



export async function POST(request) {
  connectDB();
  try {

    const reqBody = await request.json();
    const { doctorId, shifts } = reqBody;
    console.log(doctorId, shifts);
    const schedule = await doctorSchedule.create({ doctorId, shifts });
    return NextResponse.json({
      message: "Schedule Send SuccessFully",
      schedule,
      success: true
    },
      { status: 201 })


  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}