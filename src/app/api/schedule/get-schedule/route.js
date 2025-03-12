import connectDB from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import doctorSchedule from "@/models/doctorSchedule";
import { NextResponse } from "next/server";


connectDB();

export async function GET(request) {
  try {

    const doctorId = await getDataFromToken(request);
    console.log(doctorId);
    const schedule = await doctorSchedule.findOne({ doctorId });
    return NextResponse.json({
      message: "Schedule find SuccessFully",
      schedule,
      success: true
    })


  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}