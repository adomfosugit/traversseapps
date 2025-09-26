import { TLand } from "@/Types";
import { MapPinIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ILandCardProps {
  land: TLand;
  agreedPrice: number;
}

const LandCard: React.FC<ILandCardProps> = ({ land, agreedPrice }) => {
  console.log(land);

  return (
    <Link
      href={`/landlisting/${land.$id}`}
      className="group  w-3/4 max-w-4xl  flex flex-row bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.01] border border-gray-200 hover:border-traverse-primary overflow-hidden h-32"
    >
      {/* Image Section */}
      <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden">
        <Image
          src={`${land.ImageSrc[0]}/view?project=6771516200333a41d2ef&mode=admin`}
          alt={land.Listing_Title || 'Land Image'}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="128px"
        />
    
      </div>

      {/* Content Section */}
      <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
        <div className="space-y-1">
          {/* Title and Area */}
          <h3 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-traverse-primary transition-colors duration-200">
            {land.Listing_Title}
          </h3>
          
          <div className="flex items-center text-gray-600 text-xs">
            <MapPinIcon className="w-3 h-3 mr-1" />
            <span>{land.Land_Area} acres</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
            {land.Description}
          </p>
        </div>

        {/* Footer Section */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center text-traverse-yellow font-bold text-sm">
            GHS {agreedPrice.toLocaleString()}
          </div>
          
          <div className="flex items-center text-traverse-primary font-medium text-xs group-hover:translate-x-1 transition-transform duration-200">
            View Details
            <ChevronRightIcon className="w-3 h-3 ml-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LandCard;