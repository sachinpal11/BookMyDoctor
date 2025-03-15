import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath = [
    '/book-doctor',
    '/doctor-login',
    '/doctor-signup',
    '/bookappointment',
    '/doctor-search',
    '/',
    '/doctor-register'
  ].includes(path);

  const doctortoken = request.cookies.get('doctortoken')?.value || '';
  const patienttoken = request.cookies.get('patienttoken')?.value || '';

  console.log("Path:", path);
  console.log("Doctor Token:", doctortoken);
  console.log("Patient Token:", patienttoken);

  if (doctortoken && isPublicPath) {
    return NextResponse.redirect(new URL('/profile/my-profile', request.nextUrl));
  }
  if (!doctortoken && !isPublicPath) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
  if (patienttoken && isPublicPath) {
    return NextResponse.redirect(new URL('/patient-appointment', request.nextUrl));
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/profile/:path*',
    '/book-doctor',
    '/bookappointment',
    '/doctor-login',
    '/doctor-signup',
    '/doctor-register',
    '/doctor-search',
    '/patient-appointment',
    '/patient-management'
  ],
};
