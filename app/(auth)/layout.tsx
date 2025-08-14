import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '../(root)/globals.css'
import Logo from "@/components/Website/Logo";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Traverse User - Sign In",
  description: "Traverse -Remote building platform",
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
     <div className="w-full min-h-screen bg-slate-50 flex">
        <div className="w-full md:w-2/3 flex   max-w-3xl mx-auto">
        <Toaster />
        {children}
        </div>
        <div className=" hidden lg:flex lg:flex-col lg:w-1/3  items-center justify-center min-h-screen border-r border-primary shadow-2xl gap-y-2 bg-neutral-400 opacity-80">
          <Image  src='/assets/logo.svg' alt="logo" width={100} height={50} className="flex-shrink-0"/>
        <div><Image src={`/assets/pana.svg`} width={400} height={400} alt="contruction" /></div>
        </div>

     </div>

 
      </body>
    </html>
  );
}
