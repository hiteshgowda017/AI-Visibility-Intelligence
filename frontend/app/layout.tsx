import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AEO Diagnostic",
  description: "Premium AI visibility benchmarking for modern brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}