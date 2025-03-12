import { NextResponse } from 'next/server'
import jwt from "jsonwebtoken";


export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/doctor-login' || path === '/doctor-signup' || path === '/bookappointment' || path === '/doctor-search' || path === '/' || path === '/doctor-register';
  const token = request.cookies.get('token')?.value || '';
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL(`/profile/my-profile`, request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/doctor-login', request.nextUrl))
  }
}


export const config = {
  matcher: [
    '/',
    '/profile',
    '/bookappointment',
    '/doctor-login',
    '/doctor-signup',
    '/doctor-register',
    '/doctor-search'
  ],
}