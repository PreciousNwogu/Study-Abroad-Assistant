import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const startTime = Date.now();

  // Get session ID from cookie or create new one
  let sessionId = request.cookies.get("session-id")?.value;
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }

  // Get client IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-host") ||
    "127.0.0.1";

  const userAgent = request.headers.get("user-agent") || "";
  const url = request.nextUrl.pathname;

  const response = NextResponse.next();

  // Set session cookie
  response.cookies.set("session-id", sessionId, {
    maxAge: 30 * 60 * 1000, // 30 minutes
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
