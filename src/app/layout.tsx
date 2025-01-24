import "./globals.css";
import RootProvider from "./provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
