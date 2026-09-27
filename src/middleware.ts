import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to login page
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Check for admin session
  const session = request.cookies.get('admin_session');

  // If no session and trying to access admin routes, redirect to login
  if (!session && pathname.startsWith('/admin')) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If has session and on login page, redirect to dashboard
  if (session && pathname === '/admin/login') {
    const dashboardUrl = new URL('/admin/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
