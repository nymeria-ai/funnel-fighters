import { auth } from "@/auth";

export default auth((req) => {
  if (!req.auth) {
    const loginUrl = new URL("/login", req.url);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: [
    // Protect everything except login page, auth API, static files
    "/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
