import { EyeIcon } from '@heroicons/react/24/outline';
import TableNav from './TableNav';
import Link from 'next/link';
import { TSafeBid } from '@/app/(main)/landlisting/Detail';


export type TSafeLand = {
 Type_of_Interest:string;
 latitude:number;
 Longitude: number;
 Land_Area: number;
 Price:number;
 bid:TSafeBid[];
 ImageSrc:  Array<string> 
 Listing_Title: string;
 $createdAt: string;
 $id:string;
 

}
interface ILandTableProps {
  lands?: TSafeLand[] | null;
}
const LandTable = ({ lands }: ILandTableProps) => {
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-16">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Land use
              </th>
              <th scope="col" className="px-6 py-3">
                Area m<sup>2</sup>
              </th>
              <th scope="col" className="px-6 py-3">
                Created at
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {lands?.map((land) => (
              <tr
                key={land?.Listing_Title}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4">{land?.Listing_Title}</td>
                <td className="px-6 py-4">{land?.Type_of_Interest}</td>
                <td className="px-6 py-4">{land?.Land_Area} </td>
                <td className="px-6 py-4">
                {new Intl.DateTimeFormat('en-GB').format(new Date(land?.$createdAt))}
                </td>
                <td className="px-6 py-4 flex text-blue-600 hover:underline">
                  <EyeIcon className="w-4 h-4 my-auto mr-2" />{' '}
                  <Link

                    href={`/dashboard/Projects/${land?.$id}`}
                    className="font-medium "
                  >
                    View land
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <TableNav />
      </div>
    </div>
  );
};

export default LandTable;
