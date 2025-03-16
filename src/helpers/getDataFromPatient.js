import jwt from "jsonwebtoken";


export const getDataFromPatient = (request) => {
  try {

    const token = request.cookies.get("patienttoken")?.value || '';

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    return decodedToken.patientNo;

  } catch (error) {
    throw new Error(error.message);
  }
}