import { auth } from "@/auth";

export default auth((req) => {
  if (!req.auth) {
    const loginUrl = new URL("/login", req.url);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: [
    // Protect everything except login page, auth API, data APIs, static files
    "/((?!login|api/auth|api/landing-pages|api/page-rank|api/ads|api/ad-details|api/accounts|_next/static|_next/image|favicon.ico).*)",
  ],
};
