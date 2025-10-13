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
        href={ `/landlisting/${land.$id}`}
        className=" mt-7 w-full flex flex-col h-auto bg-gray-100 rounded-lg hover:border hover:border-traverse-primary"
      >
        <Image
          src={`${land.ImageSrc[0]}/view?project=6771516200333a41d2ef&mode=admin`}
          alt={'Land Image'}
          className="w-full h-[200px] hidden md:block rounded-none"
          width={200}
          height={200}
        />
        <div className="w-full flex-col ml-3 mt-3 mr-4">
          <div className="flex">
            <div className="flex">
              <p className="ml-3 font-sm">{land.Listing_Title} </p>
            </div>
          </div>
          <div className="flex text-traverse-yellow my-2 font-semibold">
      
            <p className="ml-3">GHS {land.Price}</p>
          </div>
        </div>
      </Link>
    
    )
}
export default LandCard;