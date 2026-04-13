import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import AuthProvider from "@/components/layout/AuthProvider";

const siteUrl = "https://funnel-fighters.vercel.app";
const ogTitle = "Funnel Fighters HQ";
const ogDescription =
  "Get your ducks in a row. Agentic Performance Marketing Command Center — score, optimize, and dominate every stage of the funnel.";

export const metadata: Metadata = {
  title: ogTitle,
  description: ogDescription,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: ogTitle,
    description: ogDescription,
    url: siteUrl,
    siteName: "Funnel Fighters HQ",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Funnel Fighters — Agentic Performance Marketing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-bg-primary text-text-primary antialiased">
        <AuthProvider>
          <Sidebar />
          <main className="lg:ml-[220px] min-h-screen pt-14 lg:pt-0">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
