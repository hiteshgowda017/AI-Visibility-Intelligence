import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AEO Diagnostic",
  description:
    "Premium AI visibility benchmarking platform for measuring brand performance across GPT, Claude, and Gemini.",
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