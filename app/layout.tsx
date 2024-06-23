import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { SuperTokensProvider } from "./components/supertokens/supertokensProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <SuperTokensProvider>
        <body className={inter.className}>{children}</body>
      </SuperTokensProvider>
    </html>
  );
}
