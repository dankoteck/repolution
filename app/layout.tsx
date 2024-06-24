import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import { SuperTokensProvider } from "@/components/supertokens/supertokensProvider";
import { cn } from "@/lib/utils";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Repolution",
  description: "SaaS to management all of your Github's repository contents",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <SuperTokensProvider>{children}</SuperTokensProvider>
      </body>
    </html>
  );
}
