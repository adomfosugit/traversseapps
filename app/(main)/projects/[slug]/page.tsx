import Header2 from '@/app/dashboard/Dash/Header2'
import BillingDetails from '@/components/BillingDetails'
import Drawer from '@/components/Drawer'
import LandCard from '@/components/LandCard1'
import { getLandById, getLandProjectByID } from '@/lib/Appwrite/api'
import React from 'react'


type Props = {}

const page = async({params}: { params: Promise<{slug:string}>}) => {
  const landProjectID  = await params
  const LandProjectDetails  = await getLandProjectByID(landProjectID.slug)
  console.log(LandProjectDetails)
  const LandID = LandProjectDetails?.bid.LandId 
  const LandDetails = await getLandById(LandID)
  return (
    <div className='flex gap-x-5'>
      <aside className="hidden lg:flex w-1/4 text-sm ">
        <Drawer />
      </aside> 
      <main className='flex flex-col mx-auto '>
        <Header2 backText='Projects' title='Pay Pre-Purchase Stage Fees' subText='Pre-purchase payment goes toward site inspection, interim site plan preparation, as well as all due diligence and legal advice pertaining to your on your transaction '  />
        {/* @ts-ignore */}
        <LandCard land = {LandDetails}  agreedPrice = {LandProjectDetails?.bid.Offer_Price}/>

        <BillingDetails  />
      </main>


    </div>
  )
}

export default page