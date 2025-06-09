
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../(root)/globals.css";
import Header from "@/components/Website/Header";
import { getLoggedInUser, getserviceProviderData } from "@/lib/Appwrite/api";
import { redirect } from "next/navigation";
import LandModal from "@/components/Modal/LandModal";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Toaster } from "@/components/ui/toaster";
import BidModal from "@/components/Modal/BidModal";
import CounterBidModal from "@/components/Modal/CounterBid";
import Navbar from "./Dash/Navbar";


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
export const dynamic = "force-dynamic";
export default async function RootLayout({children}: Readonly<{children: React.ReactNode;}>) 
{
 
  const getUser = await getLoggedInUser()
  if(!getUser){
    redirect('/service-provider/sign-in')
  }
  const isServiceProvider = await getserviceProviderData(getUser.email)
  if(!isServiceProvider){
      redirect('/service-provider/sign-up')
  }
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
     
     <>
      <main className="mx-36 mt-9 ">

        <Navbar />
        <Toaster />
        {children}
        <BidModal />
        <LandModal />
        <CounterBidModal />
        </main>
    </> 
 

      </body>
    </html>
  );
}

  