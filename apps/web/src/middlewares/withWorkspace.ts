import { getSession } from '@/lib/auth';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { MiddlewareFactory } from './stackHandler';

// Routes that require authentication
const protectedPaths = ['/dashboard'];

export const withWorkspace: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    // Check if user is authenticated
    const session = await getSession();
    if (!session?.workspace) {
      // Check if requested path matches any protected routes
      const hit = protectedPaths.some((path) =>
        request.nextUrl.pathname.startsWith(path)
      );
      // redirect to login if we hit a protected route
      if (hit) return redirectToOnboarding(request);
      return NextResponse.next();
    }

    return next(request, _next);
  };
};

// Helper function to handle login redirects
const redirectToOnboarding = (request: NextRequest) => {
  const newUrl = new URL('/onboarding', request.url);
  return NextResponse.redirect(newUrl);
};
