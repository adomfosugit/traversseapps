import EmptyState from '@/components/EmptyState';
import { getLandById, getLoggedInUser } from '@/lib/Appwrite/api';
import Detail from '../Detail';



const PlotSelectionDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  // Extract landId directly from params
  const landId = (await params).slug;
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

  return <Detail land={land} currentUser={currentUser} />;
};

export default PlotSelectionDetailPage;
