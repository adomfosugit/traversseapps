'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import Header2 from '@/app/dashboard/Dash/Header2';
import Documents from '../../../(main)/landlisting/Document';
import CostBreakdown, { LandCost } from '../../../(main)/landlisting/[slug]/CostBreakdown';
import AdditionalInfo from '../../../(main)/landlisting/[slug]/AdditionalInfo';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import useCounterBidModal from '@/hooks/useCounterBidModal';
import { createLandProject, updateBidStatus, updateBidStatus1 } from '@/lib/Appwrite/api';
import { toast } from '@/hooks/use-toast';
import { Calendar, DollarSign, FileText, MapPin, User, Clock, CheckCircle, XCircle, MessageSquare } from 'lucide-react';

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

  const userBids = land.bid;
  
  const getBidStatusBadge = (bid: TSafeBid) => {
    if (bid.Owner_Decision === true) {
      return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="w-3 h-3 mr-1" />Accepted</Badge>;
    } else if (bid.Owner_Decision === false) {
      return <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100"><XCircle className="w-3 h-3 mr-1" />Declined</Badge>;
    } else {
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
    }
  };

  const handleAcceptBid = async (bidId: string, BidderEmail: string) => {
    const response = await updateBidStatus1(bidId, true, BidderEmail);
    if (response.success) {      
      router.refresh();
      toast({
        title: 'Success',
        description: 'Bid accepted successfully',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to accept bid',
        variant: 'destructive',
      });
    }
  };

  const handleDeclineBid = async (bidId: string) => {
    const response = await updateBidStatus(bidId, false);
    if (response.success) {   
      router.refresh();
      toast({
        title: 'Success',
        description: 'Bid declined successfully',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to decline bid',
        variant: 'destructive',
      });
    }
  };

  const handleCounterBid = (bid: TSafeBid) => {
    const query = {
      lId: land.$id,                
      BId: bid.$id,     
      oP: bid.Offer_Price 
    };

    const url = qs.stringifyUrl({
      url: window.location.href,
      query
    }, { skipNull: true });

    router.push(url);
    bidModal.onOpen();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <Header2
            backText="Back"
            title={land.Listing_Title}
            subText={land.Description}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Bids and Additional Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bids Section */}
            {userBids.length > 0 && (
              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      Received Bids
                    </CardTitle>
                    <Badge variant="outline" className="text-sm">
                      {userBids.length} {userBids.length === 1 ? 'Bid' : 'Bids'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">

   
                    {userBids.map((bid, index) => (
                      <div key={bid.$id} className="border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                          {/* Bid Info */}
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Bidder</p>
                                <p className="font-medium text-gray-900 truncate">{bid.BidderEmail}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                                <p className="font-medium text-gray-900">
                                  {new Date(bid.$createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <DollarSign className="w-4 h-4 text-gray-400" />
                              <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Offer</p>
                                <p className="font-semibold text-lg text-green-600">
                                  ${Number(bid.Offer_Price).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Status</p>
                                {getBidStatusBadge(bid)}
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center space-x-2 lg:ml-6">
                            <Button 
                              size="sm"
                              onClick={() => handleAcceptBid(bid.$id, bid.BidderEmail)}
                              disabled={bid.Owner_Decision !== null}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              {bid.Owner_Decision === true ? 'Accepted' : 'Accept'}
                            </Button>
                            
                            <Button 
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeclineBid(bid.$id)}
                              disabled={bid.Owner_Decision !== null}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              {bid.Owner_Decision === false ? 'Declined' : 'Decline'}
                            </Button>
                            
                            <Button 
                              size="sm"
                              variant="outline"
                              onClick={() => handleCounterBid(bid)}
                              disabled={bid.Owner_Decision !== null}
                              className="border-blue-200 text-blue-700 hover:bg-blue-50"
                            >
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Counter
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Additional Info Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Property Details</CardTitle>
              </CardHeader>
              <CardContent>
                <AdditionalInfo land={land} />
              </CardContent>
            </Card>


                               {/* Empty State for No Bids */}
        {userBids.length === 0 && (
          <Card className="shadow-lg">
            <CardContent className="py-16">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bids Yet</h3>
                <p className="text-gray-500">
                  Your property listing hasn't received any bids yet. Keep your listing active to attract potential buyers.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
          </div>
          

          {/* Right Column - Documents and Cost Breakdown */}
          <div className="space-y-8">
            {/* Documents Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                  <FileText className="w-5 h-5 mr-2" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Land Document</h4>
                    <Documents documents={land.Land_Document} title={'Land Document'} />
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Search Document</h4>
                    <Documents documents={land.Search_from_LC} title={'Search Document'} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cost Breakdown Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Cost Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CostBreakdown
                  landCost={land.landCost}
                  totalCost={land.Price}
                />
              </CardContent>
            </Card>
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default ProjectDetail;