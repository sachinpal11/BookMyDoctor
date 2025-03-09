import connectDB from "@/dbConfig/dbConfig";
import doctorModel from "@/models/doctorModel";
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";


connectDB();


export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { name, age, mobile, email, degree, experience, location, password } = reqBody;

    console.log(reqBody);

    const existingDoctor = await doctorModel.findOne({ email });

    if (existingDoctor) {
      return NextResponse.json({ error: "Email is already registered" }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(password, salt);

    const newDoctor = new doctorModel({
      name,
      age,
      mobile,
      email,
      degree,
      experience,
      location,
      password: hashedPassword
    });

    const savedDoctor = await newDoctor.save();
    console.log(savedDoctor);


    return NextResponse.json({ message: "Doctor registered successfully", success: true, savedDoctor }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

