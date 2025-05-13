import { TLand } from "@/Types";
import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ILandCardProps {
    land: TLand;
    agreedPrice: number;
  }
  
const LandCard:React.FC<ILandCardProps> = ({land,agreedPrice}) => {
  console.log(land)
  
    return(
        <Link
        href={ `/landlisting/${land.$id}`}
        className=" mt-7 w-3/4 flex flex-row  bg-gray-100 rounded-lg hover:border hover:border-traverse-primary shadow-xl ">
        <Image
          src={`${land.ImageSrc[0]}/view?project=6771516200333a41d2ef&mode=admin`}
          alt={'Land Image'}
          className="w-1/4 h-[150px] hidden md:block rounded-none"
          width={200}
          height={200}
        />
        <div className="w-full flex-col ml-3 mt-3 mr-4">
          <div className="flex justify-between items-center ">
            <div className="flex flex-col">
              <p className="ml-3 font-sm">{land.Listing_Title} </p>
              <p className="ml-3 font-sm">{land.Land_Area} acres</p>
              <p className="ml-3 font-sm">{land.Description} </p>
            </div>
          </div>
          <div className="flex text-traverse-yellow my-2 font-semibold">
      
            <p className="ml-3">GHS {agreedPrice}</p>
           
          </div>
        </div>
      </Link>
    
    )
}
export default LandCard;