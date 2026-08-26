import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tourist Safety App",
  description: "Tourist safety and emergency rescue platform",
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
