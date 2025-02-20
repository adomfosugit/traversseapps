'use client';

import { LandCost } from '@prisma/client';
import {DASH_DETAIL_PAYMENT, DASH_PROJECT_DETAIL} from '../../../../../config/constants';
import useBidModal from '../../../../hooks/useBidModal';
import {TSafeBid,TSafeDocument,TSafeLand,TSafeUser} from '../../../../types';
import Header from '../../../overview/Header';
import AdditionalInfo from './AdditionalInfo';
import CostBreakdown from './CostBreakdown';
import Documents from './Documents';

import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useCallback, useEffect } from 'react';
import Gallery from '../../../../service-providers/dashboard/projects/landDetail/[landId]/Gallery';

interface IDetailProps {
  land: TSafeLand & {
    bids: TSafeBid[];
    user: TSafeUser;
    documents: TSafeDocument[];
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

  const userOfferAcceptedArray = land.bids.map(
    (bid) =>
      bid.bidderId === currentUser?.id && bid.ownerDecision === 'Accepted'
  );

  const userOfferAccepted = userOfferAcceptedArray.includes(true);

  const handleOfferClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      lId: land?.id,
      loId: land?.userId,
      oP: land?.price,
    };

    const url = qs.stringifyUrl(
      {
        url: `${DASH_PROJECT_DETAIL}/${land.id}`,
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [land, params, router]);

  useEffect(() => {}, [currentUser]);

  return (
    <div className="">
      <div className="mx-10">
        <Header
          backText="Back"
          title={land.title}
          subText={land.description}
          buttonText={userOfferAccepted ? 'Continue' : undefined}
          linkPath={
            userOfferAccepted ? `${DASH_DETAIL_PAYMENT}/${land?.id}` : undefined
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
          <div className="bg-gray-100 ">
            <Documents documents={land.documents} />
          </div>
          <div className="bg-gray-100 ">
            <CostBreakdown
              landCost={land.landCost}
              totalCost={land.totalCost}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
