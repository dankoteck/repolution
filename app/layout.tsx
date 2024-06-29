import type { Metadata } from "next";
import { Poppins as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";

import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Repolution",
  description: "SaaS to management all of your Github's repository contents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased text-[#F2E9E4]",
          fontSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
