import connectDB from "@/dbConfig/dbConfig";
import patient from "@/models/patient";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function POST(request) {
  connectDB();

  try {
    const reqBody = await request.json();
    const { doctorId, name, age, mobile, shift } = reqBody;

    const existingPatient = await patient.findOne({ doctorId, name, age, mobile, shift });
    if (existingPatient) {
      return NextResponse.json({
        message: "Already Appointed"
      });
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastPatient = await patient.findOne(
      { doctorId, createdAt: { $gte: today } },
      {},
      { sort: { patientNo: -1 } } // Get the last patient number
    );

    console.log("Last patient:", lastPatient); // Debugging

    const patientNo = lastPatient && lastPatient.patientNo ? lastPatient.patientNo + 1 : 1;

    console.log("Generated patientNo:", patientNo);
    console.log("Patient Data Before Saving:", { doctorId, name, age, mobile, shift, patientNo });


    const newpatient = new patient({ doctorId, patientNo, name, age, mobile, shift });
    console.log(newpatient);
    await newpatient.save();
    console.log(newpatient);
    const tokenData = {
      id: newpatient._id,
      name: newpatient.name,
      doctorId: newpatient.doctorId,
      mobile: newpatient.mobile,
      age: newpatient.age,
      patientNo: newpatient.patientNo
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });

    // Send response with token
    const response = NextResponse.json({
      message: "Appointed successfully",
      success: true,
    });

    response.cookies.set("patienttoken", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      success: false
    }, { status: 500 });
  }
}
