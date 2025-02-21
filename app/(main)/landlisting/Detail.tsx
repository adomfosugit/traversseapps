'use client';
//import {TSafeBid,TSafeDocument,TSafeLand,TSafeUser} from '../../../../types';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useCallback, useEffect } from 'react';
import Gallery from './[slug]/Gallery';
import Header2 from '@/app/dashboard/Dash/Header2';
import Documents from './Document';
import CostBreakdown, { LandCost } from './[slug]/CostBreakdown';
import AdditionalInfo from './[slug]/AdditionalInfo';
import useBidModal from '@/app/hooks/useBidModal';

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
  Owner_Decision: 'Accepted';
  BidderEmail:string;

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

const Detail = ({ land, currentUser }: IDetailProps) => {
  const bidModal = useBidModal();
  const params = useSearchParams();
  const router = useRouter();

  const userOfferAcceptedArray = land.bid.map(
    (bid) =>
      bid.BidderEmail === currentUser?.id && bid.Owner_Decision === 'Accepted'
 );

  const userOfferAccepted = userOfferAcceptedArray.includes(true);

  const handleOfferClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      lId: land?.$id,
      loId: land?.Email,
      oP: land?.Price,
    };

    const url = qs.stringifyUrl(
      {
        url: `landlisting/${land.$id}`,
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [land, params, router]);

  useEffect(() => {}, [currentUser]);

  return (
    <div className="flex mx-auto items-center justify-center flex-col w-full h-full">
      <div className="mx-10">
        <Header2
          backText="Back"
          title={land.Listing_Title}
          subText={land.Description}
          buttonText={userOfferAccepted ? 'Continue' : undefined}
          linkPath={
            userOfferAccepted ? `/${land?.$id}` : undefined
          }
          secondaryActionText={!userOfferAccepted ? 'Make an offer' : undefined}
          secondaryAction={() => {
            handleOfferClick();
            bidModal.onOpen();
          }}
        />
        <Gallery land={land} />
        <AdditionalInfo land={land} />
        <div className="grid grid-cols-2 gap-4 mt-10">

          <div className="bg-gray-100 flex flex-col p-6">
              <p className='text-center text-xl font-bold'> Land Document</p>
            <div className='flex flex-row mx-auto'>
            <Documents documents={land.Land_Document} title={'Land Document'} />
            <Documents documents={land.Search_from_LC} title= {'Search Document'} />
            </div>
          
          </div>
          <div className="bg-gray-100 ">
          <CostBreakdown
/// add landcost
              landCost={land.landCost}
              totalCost={land.Price}
        /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
