import connectDB from "@/dbConfig/dbConfig";
import doctorModel from "@/models/doctorModel";
import { NextResponse } from "next/server";



export async function POST(request) {

  connectDB();

  try {
    const reqBody = await request.json();

    const { id } = reqBody;

    const doctorData = await doctorModel.findById({ _id: id }).select("-password");
    return NextResponse.json({
      message: "doctor data",
      doctorData: doctorData,
      success: true
    }, {
      status: 201
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });

  }

}