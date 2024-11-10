import type { Metadata } from "next";
import "./globals.css";
import LogoutButton from "./components/LogoutButton";

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
      <body>
        <div className="flex flex-col">
          <div className="self-end">
            <LogoutButton />
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
