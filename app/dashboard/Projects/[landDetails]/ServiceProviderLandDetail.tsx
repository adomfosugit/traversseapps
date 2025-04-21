'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import Header2 from '@/app/dashboard/Dash/Header2';
import Documents from '../../../(main)/landlisting/Document';
import CostBreakdown, { LandCost } from '../../../(main)/landlisting/[slug]/CostBreakdown';
import AdditionalInfo from '../../../(main)/landlisting/[slug]/AdditionalInfo';
import { Button } from '@/components/ui/button';
import useCounterBidModal from '@/hooks/useCounterBidModal';
import { updateBidStatus } from '@/lib/Appwrite/api';




export type LandFormValues = {
  $id:string;
  location: { lat: number; lng: number } | null; 
  Land_Area: number; 
  landtype: string; 
  Type_of_Interest: string; 
  imageSrc: string[]; 
  Price: number; 
  title: string; 
  Description: string;
  DeedCert: string; 
  Indenture: string; 
  searchresult: string; 
  transtype:string;
  landstatus:string;
  Email:string;
  Listing_Title:string
  Land_Document:string;
  Search_from_LC:string;
  ImageSrc:string[];
  Zoning_Regulations:string;
  latitude:number;
  Longitude:number;
  bid: TSafeBid[]
}
export type TSafeUser = { 
  id:string;
  email:string;
}
export type TSafeBid = {

  Land_owner_Id:string;
  LandId:string;
  Offer_Price:string;
  Original_Price:string;
  Owner_Decision: Boolean;
  BidderEmail:string;
  $createdAt:Date;
  $id:string
}
interface IDetailProps {
  land: LandFormValues & {
    bid: TSafeBid[];
    landCost: LandCost | null;
    totalCost: number;
  };
  currentUser?: TSafeUser | null;
}
export type TDetailQuery = {
  lId?: string | null;
  loId?: string | null;
  oP?: number | null;
};

const ProjectDetail = ({ land, currentUser }: IDetailProps) => {
  const bidModal = useCounterBidModal()
  const router = useRouter();
  const params = useSearchParams();
  const userBids = land.bid// land.bid.filter((bid) => bid.Land_owner_Id === currentUser?.email && bid.LandId === land.$id);
  console.log(bidModal.isOpen)
  
  const handleCounterBid1 = () => {
    console.log('Counter bid button clicked');
    bidModal.onOpen();
  };
  const handleAcceptBid = async (bidId: string) => {
    const response = await updateBidStatus(bidId, true);
    if (response.success) {
      // Refresh the page or update state to reflect the change
      router.refresh();
      // You might want to add a toast notification here
      console.log('Bid accepted successfully');
    } else {
      console.error('Failed to accept bid');
    }
  };

  const handleDeclineBid = async (bidId: string) => {
    const response = await updateBidStatus(bidId, false);
    if (response.success) {
      // Refresh the page or update state to reflect the change
      router.refresh();
      // You might want to add a toast notification here
      console.log('Bid declined successfully');
    } else {
      console.error('Failed to decline bid');
    }
  };

  const handleCounterBid = (bid: TSafeBid) => {
    console.log('Counter bid button clicked');
    
    // Create query parameters with the necessary land and bid details
    const query = {
      lId: land.$id,                // land ID
      BId: bid.$id,      // land owner ID
      oP: bid.Offer_Price // offer price (converted to number)
    };

    // Stringify the query and update the URL
    const url = qs.stringifyUrl({
      url: window.location.href,
      query
    }, { skipNull: true });

    router.push(url);
    bidModal.onOpen();
  };
   


  return (
    <div className="flex mx-auto items-center justify-center flex-col w-full h-full gap-y-5">
      <div className="mx-10 mb-5">
        
        <Header2
          backText="Back"
          title={land.Listing_Title}
          subText={land.Description}  />
        <div className='mb-5'>
         
        {userBids.length > 0 && (
        <div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bid ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bidder</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offer Price</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userBids.map((bid) => (
                <tr key={bid.LandId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{bid.$id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{bid.BidderEmail}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(bid.$createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm ">${bid.Offer_Price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
  <Button 
    variant="default"
    onClick={() => handleAcceptBid(bid.$id)}
    disabled={bid.Owner_Decision !== null}
  >
    {bid.Owner_Decision === true ? 'Accepted' : 'Accept'}
  </Button>
</td>
<td className="px-6 py-4 whitespace-nowrap text-sm">
  <Button 
    variant="destructive"
    onClick={() => handleDeclineBid(bid.$id)}
    disabled={bid.Owner_Decision !== null}
  >
    {bid.Owner_Decision === false ? 'Declined' : 'Decline'}
  </Button>
</td>
<td className="px-6 py-4 whitespace-nowrap text-sm">
  <Button 
    variant="outline" 
    onClick={() => handleCounterBid(bid)} 
    className="ring-1 ring-green-500"
    disabled={bid.Owner_Decision !== null}
  >
    Counter bid
  </Button>
</td>

                  
                  
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>
      )}
        </div>
        <AdditionalInfo land={land} />


        <div className="grid grid-cols-2 gap-4 mt-10">
          <div className="bg-gray-100 flex flex-col p-6">
            <p className='text-center text-xl font-bold'> Land Document</p>
            <div className='flex flex-row mx-auto'>
              <Documents documents={land.Land_Document} title={'Land Document'} />
              <Documents documents={land.Search_from_LC} title={'Search Document'} />
            </div>
          </div>
          <div className="bg-gray-100 ">
            <CostBreakdown
              landCost={land.landCost}
              totalCost={land.Price}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;