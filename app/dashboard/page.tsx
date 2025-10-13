import { getBrokerLands,getJobListing1, getLoggedInUser, getserviceProviderData } from "@/lib/Appwrite/api";
import Dashboard from "./Dash/Dashboard";

const ServiceProviders = async () => {
  const currentUser = await getLoggedInUser();
  
  const serviceProvider  = await getserviceProviderData(currentUser.email)
  console.log(serviceProvider)


  const isLandOwner = serviceProvider?.profession === 'Land broker';

  let brokerLands,Joblists;
  
  if (isLandOwner) {
  brokerLands = await getBrokerLands(currentUser.email);
  console.log(brokerLands)  
 
  } else {
  Joblists = await getJobListing1(serviceProvider?.profession);
  
  }
  return (
    <div className="w-full min-h-screen">
       <Dashboard
        currentUser={currentUser}
        //@ts-ignore
        brokerLands={brokerLands}
        brokerProfession={serviceProvider?.profession}
        // @ts-ignore
        projectListings = {Joblists}
      />
    </div>
  );
};

export default ServiceProviders;