import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const ALLOWED_EMAILS = [
  "guyre@monday.com",
  "regevguy1@gmail.com",
  "roy@monday.com",
  "idokirshenboim@gmail.com",
  "diego.malamute.1@gmail.com", // Nymeria
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const email = user.email?.toLowerCase();
      if (!email) return false;
      return ALLOWED_EMAILS.some((e) => e.toLowerCase() === email);
    },
    async session({ session }) {
      return session;
    },
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isLoginPage = request.nextUrl.pathname.startsWith("/login");
      const isAuthApi = request.nextUrl.pathname.startsWith("/api/auth");
      if (isLoginPage || isAuthApi) return true;
      if (!isLoggedIn) return false; // redirects to login
      return true;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});
