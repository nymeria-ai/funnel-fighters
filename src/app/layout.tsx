import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Funnel Fighters HQ",
  description: "Agentic Performance Marketing Command Center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-bg-primary text-text-primary antialiased">
        <Sidebar />
        <main className="lg:ml-[220px] min-h-screen pt-14 lg:pt-0">
          {children}
        </main>
      </body>
    </html>
  );
}
