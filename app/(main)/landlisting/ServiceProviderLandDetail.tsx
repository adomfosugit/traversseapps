'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useCallback, useEffect } from 'react';
import Gallery from './[slug]/Gallery';
import Header2 from '@/app/dashboard/Dash/Header2';
import Documents from './Document';
import CostBreakdown, { LandCost } from './[slug]/CostBreakdown';
import AdditionalInfo from './[slug]/AdditionalInfo';
import useBidModal from '@/app/hooks/useBidModal';
import Map from '@/components/DisplayMap';
import { Button } from '@/components/ui/button';
import BidModal from '@/components/Modal/BidModal';
import useCounterBidModal from '@/hooks/useCounterBidModal';
import useLandModal from '@/hooks/useLandModal';




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
  $createdAt:Date
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
  const bidModal = useBidModal()
  const userBids = land.bid.filter((bid) => bid.Land_owner_Id === currentUser?.email && bid.LandId === land.$id);
  console.log(bidModal.isOpen)
  
  const handleCounterBid = () => {
    console.log('Counter bid button clicked');
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offer Price</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userBids.map((bid) => (
                <tr key={bid.LandId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{bid.LandId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(bid.$createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm ">${bid.Offer_Price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm ">
                    <Button className='bg-green-500 hover:bg-green-800'>Accept</Button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm ">
                    <Button variant='destructive'>Decline</Button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm ">
                    <Button variant={'outline'} onClick={handleCounterBid} className='ring-1 ring-green-500'>Counter bid</Button>
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