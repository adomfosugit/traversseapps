import { EyeIcon } from '@heroicons/react/24/outline';

import { JetBrains_Mono } from 'next/font/google';
import { TsafeJoblist } from '../Dash/Dashboard';
import TableNav from '../Dash/TableNav';


interface IServiceTableProps {
  Job_Listings?: TsafeJoblist[] | null;
  Profession: string
}
const ServiceTable = ({ Job_Listings, Profession }: IServiceTableProps) => {
  const isSurveyor = Profession === 'Surveyor';
  const isPlanner = Profession === 'Planner';
  const isLawyer = Profession === 'Lawyer'
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-16">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
            
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">LandID</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Created At</th>
              <th scope="col" className="px-6 py-3"> Details</th>
            </tr>
          </thead>
          <tbody>
            {Job_Listings?.map((job) => (
              <tr
                key={job.$id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4">{job?.$id}</td>
                <td className="px-6 py-4">{job?.LandID}</td>
               {isSurveyor && ( <td className={`px-6 py-4 ${job?.SiteVisitCompletionStatus ? 'text-green-600' : 'text-red-600'}`}> {job?.SiteVisitCompletionStatus ? 'Complete' : 'Incomplete'}</td>) }
               {isPlanner && ( <td className={`px-6 py-4 ${job?.LCSearchCompletionStatus ? 'text-green-600' : 'text-red-600'}`}> {job?.LCSearchCompletionStatus ? 'Complete' : 'Incomplete'}</td>) }
            {/*   {isLawyer && ( <td className={`px-6 py-4 ${job?.ZoningReportComplete ? 'text-green-600' : 'text-red-600'}`}> {job?.ZoningReportComplete ? 'Complete' : 'Incomplete'}</td>) } */}
               {isLawyer && ( 
                 <td className="px-6 py-4">
                   <div className="flex flex-col gap-1">
                     <div className={`text-xs ${job?.ZoningReportComplete ? 'text-green-600' : 'text-red-600'}`}>
                       Prepurchase: {job?.ZoningReportComplete ? '✓ Complete' : '✗ Incomplete'}
                     </div>
                     <div className={`text-xs ${job?.LawyerPurchaseStage ? 'text-green-600' : 'text-red-600'}`}>
                       Purchase: {job?.LawyerPurchaseStage ? '✓ Complete' : '✗ Incomplete'}
                     </div>
                     <div className={`text-xs ${job?.LawyerRegistrationStage ? 'text-green-600' : 'text-red-600'}`}>
                       Registration: {job?.LawyerRegistrationStage ? '✓ Complete' : '✗ Incomplete'}
                     </div>
                   </div>
                 </td>
               )} 
                <td className="px-6 py-4">
                {new Intl.DateTimeFormat('en-GB').format(new Date(job?.$createdAt))}
                </td>
                <td className="px-6 py-4 flex text-blue-600 hover:underline">
                  <EyeIcon className="w-4 h-4 my-auto mr-2" />{' '}
                  <a
                    href={`/dashboard/${job?.$id}`}
                    className="font-medium "
                  >
                    View Details
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