import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {

  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/doctor-login' || path === '/doctor-signup';

  const token = request.cookies.get('token')?.value || ''
  console.log("token", token);

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
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