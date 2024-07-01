import type { Metadata } from "next";
import { Poppins as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";

import UIHeader from "@/components/ui/header";
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
          "min-h-screen bg-background font-sans text-[#F2E9E4] antialiased",
          fontSans.variable,
        )}
      >
        <UIHeader />
        <main className="container -mt-28 w-full">{children}</main>
      </body>
    </html>
  );
}
