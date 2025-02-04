import { getSession } from '@/lib/auth';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { MiddlewareFactory } from './stackHandler';

// Routes that require authentication
const protectedPaths = ['/dashboard', '/onboarding'];

export const withUser: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    // Check if user is authenticated
    const isAuthenticated = await getSession();
    if (!isAuthenticated) {
      // Check if requested path matches any protected routes
      const hit = protectedPaths.some((path) =>
        request.nextUrl.pathname.startsWith(path)
      );
      // redirect to login if we hit a protected route
      if (hit) return redirectToLogin(request);
      return NextResponse.next();
    }
    // Check if authenticated user is trying to access auth pages
    const hit = ['/auth/sign-in', '/auth/sign-up'].some((path) =>
      request.nextUrl.pathname.startsWith(path)
    );
    if (hit) {
      // Get the redirect URL from query params if it exists
      const next = request.nextUrl.searchParams.get('next');
      if (next) {
        return NextResponse.redirect(new URL(decodeURI(next), request.url));
      }
      // Otherwise redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return next(request, _next);
  };
};

// Helper function to handle login redirects
const redirectToLogin = (request: NextRequest) => {
  const next = request.nextUrl.clone();
  const newUrl = new URL('/auth/sign-in', request.url);
  newUrl.searchParams.set('next', next.toString());
  return NextResponse.redirect(newUrl);
};
