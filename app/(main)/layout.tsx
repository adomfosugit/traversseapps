import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../(root)/globals.css";
import Header from "@/components/Website/Header";
import Navbar from "./projects/overview/Navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Traverse ",
  description: "Traverse -Revolutinizing building in Africa - Real Estate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        {children}

      </body>
    </html>
  );
}
