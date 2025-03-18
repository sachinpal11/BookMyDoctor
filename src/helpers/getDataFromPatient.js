import patient from "@/models/patient";
import jwt from "jsonwebtoken";


export const getDataFromPatient = (request) => {
  try {

    const token = request.cookies.get("patienttoken")?.value || '';

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const patientData = {
      patientNo: decodedToken.patientNo,
      doctorId: decodedToken.doctorId
    }
    return patientData;

  } catch (error) {
    throw new Error(error.message);
  }
}