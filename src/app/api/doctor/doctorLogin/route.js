import connectDB from "@/dbConfig/dbConfig";
import doctorModel from "@/models/doctorModel";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";


connectDB();


export async function POST(request) {
  try {

    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log("Received Data:", reqBody);

    const existingDoctor = await doctorModel.findOne({ email });

    if (!existingDoctor) {
      return NextResponse.json({
        error: "Email is not registered"
      }, { success: false });
    }

    const isPasswordMatch = await bcryptjs.compare(password, existingDoctor.password);

    if (!isPasswordMatch) {
      return NextResponse.json({
        error: "Invalid Password or email"
      }, { status: 400 });
    }

    const tokenData = {
      id: existingDoctor._id,
      name: existingDoctor.name,
      email: existingDoctor.email,

    }

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });

    const response = NextResponse.json({
      message: "login successfully",
      success: true,
    })

    response.cookies.set("token", token, {
      httpOnly: true,
    })

    return response;




  } catch (error) {
    return NextResponse.json({
      error: error.message
    }, {
      status: 500
    })
  }
}