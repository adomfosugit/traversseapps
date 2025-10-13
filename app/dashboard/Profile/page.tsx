// app/service-provider-profile/page.tsx (or wherever you use it)
import ServiceProviderProfileForm from '@/components/ServiceProviderProfileForm'
import { getLoggedInUser, getserviceProviderData } from '@/lib/Appwrite/api'


const ServiceProviderProfile = async () => {
  const user = await getLoggedInUser()
  const providerData = await getserviceProviderData(user.email)

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <ServiceProviderProfileForm initialData={providerData} />
      </div>
    </div>
  )
}

export default ServiceProviderProfile
