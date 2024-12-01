import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Poop tracker",
  description: "Your favourite poop tracker",
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
