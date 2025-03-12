import { getDataFromToken } from "@/helpers/getDataFromToken";
import doctorModel from "@/models/doctorModel";
import { NextResponse } from "next/server";

const { default: connectDB } = require("@/dbConfig/dbConfig");

// const { connectDB } from '@/dbConfig/dbConfig';

connectDB();


export async function GET(request) {
  try {

    const doctorID = await getDataFromToken(request);
    const doctor = await doctorModel.findById({ _id: doctorID }).select("-password");

    return NextResponse.json({
      message: "user Found",
      data: doctor
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

}