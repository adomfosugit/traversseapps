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

  // Check if the current user has an accepted offer
  const userOfferAcceptedArray = land.bid.map(
    (bid) =>
      bid.BidderEmail === currentUser?.email && bid.Owner_Decision === true
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
        url: `/landlisting/${land?.$id}`,
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [land, params, router]);

  // Handle "Continue" button click
  const handleContinueClick = useCallback(() => {
    if (userOfferAccepted) {
      router.push(`/${land?.$id}`);
    }
  }, [userOfferAccepted, land, router]);

  useEffect(() => {}, [currentUser]);

  return (
    <div className="flex mx-auto items-center justify-center flex-col w-full h-full">
      <div className="mx-10">
        <Header2
          backText="Back"
          title={land.Listing_Title}
          subText={land.Description}
          buttonText={userOfferAccepted ? 'Continue' : undefined}
          buttonAction={userOfferAccepted ? handleContinueClick : undefined} // Pass buttonAction
          linkPath={userOfferAccepted ? `/${land?.$id}` : undefined}
          secondaryActionText={!userOfferAccepted ? 'Make an offer' : undefined}
          secondaryAction={() => {
            handleOfferClick();
            bidModal.onOpen();
          }}
        />
        <div className='mb-5'>
          <Gallery land={land} />
          <Map latitude={land.latitude} longitude={land.Longitude} />
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

export default Detail;