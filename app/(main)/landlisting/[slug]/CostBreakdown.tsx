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
  return (
    <div className="h-auto w-full m-8">
      <p className="font-semibold mb-4"> Land purchase & closing cost</p>
      <p className="text-gray-500 text-sm">Fees for this land</p>
      <hr className="w-3/5 mt-2" />
      <p className="text-gray-500 text-sm font-semibold mt-5 mb-3">
        Pre-Purchase Stage
      </p>
      <div className="mr-20 text-sm">
        <div className="flex justify-between">
          <p>Site visit & survey</p>
          <p>{currencyFormat(landCost?.siteVisit ?? 0)}</p>
        </div>
        <div className="flex justify-between">
          <p>Lands Commissions Search</p>
          <p>{currencyFormat(landCost?.landsCommissionSearch ?? 0)}</p>
        </div>
        <div className="flex justify-between">
          <p>Legal Advise</p>
          <p>{currencyFormat(landCost?.legalAdvice ?? 0)}</p>
        </div>
        <div className="flex justify-between">
          <p>Bar Coded Site Plan Preparation</p>
          <p>{currencyFormat(landCost?.barCode ?? 0)}</p>
        </div>
        <div className="flex justify-between">
          <p>Service Fee</p>
          <p>{currencyFormat(landCost?.serviceFee ?? 0)}</p>
        </div>
      </div>
      <p className="text-gray-500 text-sm font-semibold mt-5 mb-3">
        Purchase Stage
      </p>
      <div className="mr-20 text-sm">
        <div className="flex justify-between">
          <p>Sale & Purchase Agreement</p>
          <p>{currencyFormat(landCost?.saleAgreement ?? 0)}</p>
        </div>
        <div className="flex justify-between">
          <p>Conveyance</p>
          <p>{currencyFormat(landCost?.conveyance ?? 0)}</p>
        </div>
        <div className="flex justify-between">
          <p>Oath of Proof</p>
          <p>{currencyFormat(landCost?.oathOfProof ?? 0)}</p>
        </div>
      </div>
      <p className="text-gray-500 text-sm font-semibold mt-5 mb-3">
        Pre-Purchase Stage
      </p>
      <div className="mr-20 text-sm">
        <div className="flex justify-between">
          <p>Stamp Duty</p>
          <p>{currencyFormat(landCost?.stampDuty ?? 0)}</p>
        </div>
        <div className="flex justify-between">
          <p>Processing of Consent/concurrence</p>
          <p>{currencyFormat(landCost?.concurrence ?? 0)}</p>
        </div>
        <div className="flex justify-between">
          <p>Land Title Lodgement</p>
          <p>{currencyFormat(landCost?.landTitle ?? 0)}</p>
        </div>
        <div className="flex justify-between">
          <p>Parcel Plane Preparation</p>
          <p>{currencyFormat(landCost?.parcelPlane ?? 0)}</p>
        </div>
        <div className="flex justify-between">
          <p>Publication</p>
          <p>{currencyFormat(landCost?.publication ?? 0)}</p>
        </div>
        <div className="flex justify-between">
          <p>Certificate Typing</p>
          <p>{currencyFormat(landCost?.certificateTyping ?? 0)}</p>
        </div>
        <div className="flex justify-between">
          <p>Certificate Issuance</p>
          <p>{currencyFormat(landCost?.certificateIssuance ?? 0)}</p>
        </div>
      </div>
      <div className="flex justify-between font-semibold mt-5 mr-20">
        <p>Total</p>
        <p>{currencyFormat(totalCost ?? 0)}</p>
      </div>
    </div>
  );
};

export default CostBreakdown;
