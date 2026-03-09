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
      <body>{children}</body>
    </html>
  );
}
