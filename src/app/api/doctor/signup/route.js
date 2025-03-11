import connectDB from "@/dbConfig/dbConfig";
import doctorModel from "@/models/doctorModel";
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";

import cloudinary from 'cloudinary';




connectDB();
export async function POST(request) {
  try {
    const reqBody = await request.json();
    console.log("Received Data:", reqBody);
    const { name, age, mobile, email, degree, experience, location, password, image } = reqBody;

    const existingDoctor = await doctorModel.findOne({ email });



    if (existingDoctor) {
      return NextResponse.json({ error: "Email is already registered" }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(password, salt);

    const newDoctor = new doctorModel({
      name,
      age: parseInt(age),
      mobile,
      email,
      degree,
      experience: parseInt(experience),
      location,
      password: hashedPassword,
      image,
    });

    const savedDoctor = await newDoctor.save();


    return NextResponse.json({ message: "Doctor registered successfully", success: true, savedDoctor }, { status: 201 });

  } catch (error) {
    console.log("signup catch error", error);
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

