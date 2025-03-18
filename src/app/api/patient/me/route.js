
import { getDataFromPatient } from '@/helpers/getDataFromPatient';
import { NextResponse } from 'next/server';
const { default: connectDB } = require("@/dbConfig/dbConfig");


connectDB();


export async function GET(request) {
  try {

    const patientData = getDataFromPatient(request);

    return NextResponse.json(
      {
        message: "Patient No is here",
        patientNo: patientData.patientNo
      }
    )
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

}