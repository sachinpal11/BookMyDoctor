
import connectDB from "@/dbConfig/dbConfig";

import doctorSchedule from "@/models/doctorSchedule";
import { NextResponse } from "next/server";



export async function POST(request) {

  connectDB();

  try {
    const reqBody = await request.json();

    const { id } = reqBody;
    console.log(id);
    const scheduleData = await doctorSchedule.findOne({ doctorId: id });
    console.log(scheduleData);
    return NextResponse.json({
      message: "doctor schedule data",
      scheduleData: scheduleData,
      success: true
    }, {
      status: 201
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });

  }

}