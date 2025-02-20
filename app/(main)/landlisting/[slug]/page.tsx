import EmptyState from '@/components/EmptyState';
import { getLandById, getLoggedInUser } from '@/lib/Appwrite/api';


interface IPlotSelectionDetailParams {
  landId?: string;
}
const PlotSelectionDetailPage = async ({
  params,
}: {
  params: IPlotSelectionDetailParams;
}) => {
    const landId = params
  const land = await getLandById(params?.pathname);
  console.log(params)
  const currentUser = await getLoggedInUser();
  if (!land) {
    return <EmptyState />;
  }
  return <Detail land={land} currentUser={currentUser} />;
};

export default PlotSelectionDetailPage;
