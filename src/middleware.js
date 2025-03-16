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

  // Redirect doctors to profile, but not if they are already there
  if (doctortoken && isPublicPath && path !== '/profile/my-profile') {
    return NextResponse.redirect(new URL('/profile/my-profile', request.nextUrl));
  }

  // Redirect patients to appointment, but not if they are already there
  if (patienttoken && isPublicPath && path !== '/patient-appointment') {
    return NextResponse.redirect(new URL('/patient-appointment', request.nextUrl));
  }

  // Prevent unauthenticated users from accessing private paths
  if (!isPublicPath && !doctortoken && !patienttoken) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
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
    '/start-appointment',
    '/patient-appointment',
    '/patient-management'
  ],
};
