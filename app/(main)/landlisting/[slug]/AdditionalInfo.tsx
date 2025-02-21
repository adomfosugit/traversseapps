import { currencyFormat } from "@/lib/utils";
import { LandFormValues, TSafeUser } from "../Detail";



interface IAdditionalInfoProps {
  land: LandFormValues
 
  };


const AdditionalInfo = ({ land }: IAdditionalInfoProps) => {
  return (
    <div className="h-auto  w-full bg-gray-100">
      <p className="ml-4 text-gray-600 font-semibold py-8">
        Additional Information
      </p>
      <div className="flex justify-between pb-8 mr-20">
        <div className="flex-col mx-4">
          <div className="text-gray-500 text-sm">Price</div>
          <div className="font-semibold">{currencyFormat(land.Price)}</div>
        </div>
        <div className="flex-col">
          <div className="text-gray-500 text-sm">Plot Size</div>
          <div className="font-semibold">
            {land.Land_Area} acres
          </div>
        </div>
        <div className="flex-col">
          <div className="text-gray-500 text-sm">Land Type</div>
          <div className="font-semibold">{land.Zoning_Regulations}</div>
        </div>
        
        <div className="flex-col">
          <div className="text-gray-500 text-sm">Interest Type</div>
          <div className="font-semibold">{land.Type_of_Interest}</div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
