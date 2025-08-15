

import React from 'react'
import { Button } from '@/components/ui/button'
import { getLoggedInUser, getserviceProviderData } from '@/lib/Appwrite/api'



const ServiceProviderProfile = async() => {
    const user = await getLoggedInUser()
    const providerData  = await getserviceProviderData(user.email)
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
          {providerData?.Name}
        </div>
        <h1 className="text-2xl font-bold mt-4">{providerData?.Name}</h1>
        <p className="text-zinc-500">{providerData?.profession}</p>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-zinc-500">Email</h3>
          <p className="text-base">{providerData?.Email}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-500">Phone</h3>
          <p className="text-base">{providerData?.Phone}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-500">Country</h3>
          <p className="text-base">{providerData?.Country}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-500">Official Address</h3>
          <p className="text-base">{providerData?.officialAddress}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-500">Membership ID</h3>
          <p className="text-base">{providerData?.membershipID}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-500">Membership Affiliation</h3>
          <p className="text-base">{providerData?.membershipAffiliation}</p>
        </div>
      </div>

      {/* Optional Action */}
      <div className="mt-8 text-center">
        <Button variant="outline">Contact Provider</Button>
      </div>
    </div>
  )
}

export default ServiceProviderProfile
