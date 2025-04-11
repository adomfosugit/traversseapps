import ProjectDetail from '@/app/(main)/landlisting/ServiceProviderLandDetail';
import EmptyState from '@/components/EmptyState';
import { getLandById, getLoggedInUser } from '@/lib/Appwrite/api';




const page = async ({
  params,
}: {
  params: Promise<{ landDetails: string }>
}) => {
  // Extract landId directly from params
  const landId = (await params).landDetails;
  console.log(landId)
  if (!landId) {
    return <EmptyState />;
  }

  const land = await getLandById(landId);
  const currentUser = await getLoggedInUser();
  console.log(land)

  if (!land) {
    return <EmptyState />;
  }

  
// @ts-ignore

  return (
    
  <ProjectDetail land={land} currentUser={currentUser} />)
};

export default page;
