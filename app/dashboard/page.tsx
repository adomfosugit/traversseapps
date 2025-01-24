import { getBrokerLands, getLands, getLoggedInUser, getserviceProviderData } from "@/lib/Appwrite/api";
import Dashboard from "./Dash/Dashboard";

const ServiceProviders = async () => {
  const currentUser = await getLoggedInUser();
  
  const serviceProvider  = await getserviceProviderData(currentUser.email)
  console.log(serviceProvider)


  const isLandOwner = serviceProvider?.profession === 'Land broker';

  let brokerLands, providerProjects;
  if (isLandOwner) {
  brokerLands = await getBrokerLands(currentUser.email);
  } else {
  brokerLands = await getLands();
  }

  return (
    <div className="w-full min-h-screen">
       <Dashboard
        currentUser={currentUser}
        brokerLands={brokerLands}
        brokerProfession={serviceProvider?.profession}
      />
    </div>
  );
};

export default ServiceProviders;