import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// Email allowlist — only these emails can access the dashboard
const ALLOWED_EMAILS = (process.env.ALLOWED_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    signIn({ profile }) {
      if (!profile?.email) return false;
      const email = profile.email.toLowerCase();
      // If no allowlist configured, allow all Google logins
      if (ALLOWED_EMAILS.length === 0) return true;
      return ALLOWED_EMAILS.includes(email);
    },
    session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});
