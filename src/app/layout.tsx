import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flight Booking Platform",
  description: "B2B Flight Booking Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link
          rel="preload"
          href="https://cdn.fontshare.com/woff2/J7auZkvamxczNMEtQW02lA.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://cdn.fontshare.com/woff2/B2_wnnmNqTpOy-B2MGNQUQ.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://cdn.fontshare.com/woff2/b4GqNsJlg40rMASWzOGmQw.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
