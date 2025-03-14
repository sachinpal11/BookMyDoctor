import connectDB from "@/dbConfig/dbConfig";
import patient from "@/models/patient";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'



export async function POST(request) {

  connectDB();

  try {
    const reqBody = await request.json();
    const { doctorId, name, age, mobile, shift } = reqBody;

    const existingPatient = await patient.findOne({ doctorId, name, age, mobile, shift });
    if (existingPatient) {
      return NextResponse.json({
        message: "already Appointed"
      })
    }
    const newpatient = await patient.create({ doctorId, name, age, mobile, shift });

    const tokenData = {
      id: newpatient._id,
      name: newpatient.name,
      mobile: newpatient.mobile,
      age: newpatient.age,

    }

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });


    const response = NextResponse.json({
      message: "appointed successfully",
      success: true,
    })

    response.cookies.set("patienttoken", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    })

    return response;



  }
  catch (error) {
    return NextResponse.json({
      error: error.message,
      success: false
    }, { status: 500 })
  }
}