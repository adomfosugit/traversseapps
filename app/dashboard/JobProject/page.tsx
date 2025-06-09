import React from 'react'
import Header2 from '../Dash/Header2'
import { getJobListingForSurveyor, getLoggedInUser } from '@/lib/Appwrite/api'
import ServiceTable from './ServiceTableProvider'


type Props = {}

const page = async(props: Props) => {
    const user = await getLoggedInUser()
    console.log(user)
    const joblistings = await getJobListingForSurveyor(user.email)
  return (
    <div className='flex flex-col gap-y-5'>
        <Header2 title='Projects' subText='All projects assigned/accepted to you will show here' backText='Back' />
        {/* @ts-ignore */}
        <ServiceTable  Job_Listings={joblistings}/>
    </div>
  )
}

export default page