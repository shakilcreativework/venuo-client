import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const PROTECTED_PATHS = ["/items/add", "/items/manage", "/checkout"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
  if (!isProtected) {
    return NextResponse.next();
  }

  // getSessionCookie only checks for the cookie's presence (fast, no DB call).
  // Treat it as a redirect guard; still verify the real session server-side
  // wherever you read/write sensitive data (e.g. inside the route handlers).
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/items/add/:path*", "/items/manage/:path*", "/checkout/:path*"],
};