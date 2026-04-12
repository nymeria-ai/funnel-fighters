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
      console.log("[AUTH] signIn callback", { email: profile?.email, allowlist: ALLOWED_EMAILS });
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
  debug: true,
  logger: {
    error(error) {
      console.error("[AUTH ERROR]", error);
    },
    warn(code) {
      console.warn("[AUTH WARN]", code);
    },
    debug(message, metadata) {
      console.log("[AUTH DEBUG]", message, metadata);
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});
