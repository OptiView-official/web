import "@/styles/globals.css";

import { type Metadata } from "next";
import Script from "next/script";
import { keepCalm, fzltchk } from "@/lib/fonts";

import Shell from "./_components/shell";
import ReownProvider from "@/reown/context";
import { Toaster } from "@/components/ui/sonner";
import PointsSystemProvider from "./_components/points-system-provider";

export const metadata: Metadata = {
  title: "OPTI View",
  description: "We offer Ai-based on-chain market analysis, guiding you into the professional field of web3.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={` ${keepCalm.variable} ${fzltchk.variable} font-keep-calm`}>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YG0F48TM66"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YG0F48TM66');
          `}
        </Script>
      </head>
      <body className="bg-slate-50">
        <ReownProvider>
          <PointsSystemProvider>
            <Shell>{children}</Shell>
          </PointsSystemProvider>
        </ReownProvider>
        <Toaster richColors theme="light" closeButton />
      </body>
    </html>
  );
}
