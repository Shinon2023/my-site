import "./globals.css";
import RootProvider from "./provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <RootProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </RootProvider>
      </body>
    </html>
  );
}
