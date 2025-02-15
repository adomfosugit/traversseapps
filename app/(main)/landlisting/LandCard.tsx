import { TLand } from "@/Types";
import { MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ILandCardProps {
    land: TLand;
  }
  
const LandCard:React.FC<ILandCardProps> = ({land}) => {
  console.log(land)
  
    return(
        <Link
        href={'/'}
        className=" mt-7 w-full flex h-auto bg-gray-100 rounded-lg hover:border hover:border-traverse-yellow"
      >
        <Image
          src={land.ImageSrc[0]}
          alt={'Land Image'}
          className="w-2/6 h-auto hidden md:block rounded-l-lg"
          width={100}
          height={100}
        />
        <div className="w-4/6 flex-col ml-3 mt-3 mr-4">
          <div className="flex">
            <MapPinIcon className="text-gray-500 h-6 w-4 shrink-0" />
            <div className="flex">
              <p className="ml-3 font-semibold">{land.Listing_Title} </p>
            </div>
          </div>
          <div className="flex  text-gray-500 mt-2">
           
            <p className="ml-3">{land.Land_Area}</p>
            <p className="ml-3">{land.Zoning_Regulations}</p>
          </div>
          <div className="flex  text-gray-500 mt-2">
          
            <p className="ml-3 mr-4 line-clamp-2">{land.Description}</p>
          </div>
          <div className="flex text-traverse-yellow my-2 font-semibold">
      
            <p className="ml-3">GHS {land.Price}</p>
          </div>
        </div>
      </Link>
    
    )
}
export default LandCard;