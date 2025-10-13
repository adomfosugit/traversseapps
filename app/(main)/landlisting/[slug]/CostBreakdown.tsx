import { currencyFormat } from "@/lib/utils";

export type LandCost = {
    siteVisit:number;
    landsCommissionSearch:number;
    legalAdvice:number;
    barCode:number;
    serviceFee:number;
    saleAgreement:number;
    conveyance:number;
    oathOfProof:number;
    stampDuty:number;
    concurrence:number;
    landTitle:number;
    parcelPlane:number;
    publication:number;
    certificateTyping:number;
    certificateIssuance:number;
}
interface ICostBreakdownProps {
  landCost: LandCost | null;
  totalCost: number;
}

const CostBreakdown = ({ landCost, totalCost }: ICostBreakdownProps) => {
  console.log(totalCost)
  return (
    <div className="h-auto w-full m-8">
      <p className="font-semibold mb-4"> Land purchase & Closing cost</p>
      <p className="text-gray-500 text-sm">Fees for this land</p>
      <hr className="w-3/5 mt-2" />
      <p className="text-gray-500 text-sm font-semibold mt-5 mb-3">
        Pre-Purchase Stage
      </p>
      <div className="mr-20 text-sm">
        <div className="flex justify-between">
          <p>Site visit & survey</p>
          <p>{totalCost * 0.05}</p>
        </div>
        <div className="flex justify-between">
          <p>Lands Commissions Search</p>
          <p>{totalCost * 0.05}</p>
        </div>
        <div className="flex justify-between">
          <p>Legal Advise</p>
          <p>{totalCost * 0.05}</p>
        </div>
        <div className="flex justify-between">
          <p>Bar Coded Site Plan Preparation</p>
          <p>{totalCost *0.08}</p>
        </div>
        <div className="flex justify-between">
          <p>Service Fee</p>
          <p>{totalCost * 0.03}</p>
        </div>
      </div>
      <p className="text-gray-500 text-sm font-semibold mt-5 mb-3">
        Purchase Stage
      </p>
      <div className="mr-20 text-sm">
        <div className="flex justify-between">
          <p>Sale & Purchase Agreement</p>
          <p>{totalCost * 0.03}</p>
        </div>
        <div className="flex justify-between">
          <p>Conveyance</p>
          <p>{totalCost * 0.03}</p>
        </div>
        <div className="flex justify-between">
          <p>Oath of Proof</p>
          <p>{totalCost * 0.03}</p>
        </div>
      </div>
      <p className="text-gray-500 text-sm font-semibold mt-5 mb-3">
        Pre-Purchase Stage
      </p>
      <div className="mr-20 text-sm">
        <div className="flex justify-between">
          <p>Stamp Duty</p>
          <p>{totalCost * 0.03}</p>
        </div>
        <div className="flex justify-between">
          <p>Processing of Consent/concurrence</p>
          <p>{totalCost * 0.03}</p>
        </div>
        <div className="flex justify-between">
          <p>Land Title Lodgement</p>
          <p>{totalCost * 0.03}</p>
        </div>
        <div className="flex justify-between">
          <p>Parcel Plane Preparation</p>
          <p>{totalCost * 0.03}</p>
        </div>
        <div className="flex justify-between">
          <p>Publication</p>
          <p>{totalCost * 0.03}</p>
        </div>
        <div className="flex justify-between">
          <p>Certificate Typing</p>
          <p>{totalCost * 0.03}</p>
        </div>
        <div className="flex justify-between">
          <p>Certificate Issuance</p>
          <p>{totalCost * 0.03}</p>
        </div>
      </div>
      <div className="flex justify-between font-semibold mt-5 mr-20">
        <p>Total</p>
        <p>{totalCost }</p>
      </div>
    </div>
  );
};

export default CostBreakdown;
