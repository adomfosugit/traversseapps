import { EyeIcon } from '@heroicons/react/24/outline';
import TableNav from './TableNav';
import { TSafeLand } from './LandTable';

interface IServiceTableProps {
  lands?: TSafeLand[] | null;
}
const ServiceTable = ({ lands }: IServiceTableProps) => {
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-16">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Recent Activities
              </th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
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
                <td className="px-6 py-4">{land?.Type_of_interest}</td>
                <td className="px-6 py-4">{land?.Land_Area} </td>
                <td className="px-6 py-4">
                 24/01/2024
                </td>
                <td className="px-6 py-4 flex text-blue-600 hover:underline">
                  <EyeIcon className="w-4 h-4 my-auto mr-2" />{' '}
                  <a
                    href={`/`}
                    className="font-medium "
                  >
                    View land
                  </a>
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

export default ServiceTable;