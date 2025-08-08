import Header2 from '@/app/dashboard/Dash/Header2'
import LandCard from '@/components/LandCard1'
import { Button } from '@/components/ui/button'
import { AssignPlannerJob, AssignSurveyorJob, getJobListingbyID, getLandById, getLoggedInUser, getserviceProviderData } from '@/lib/Appwrite/api'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteVisitForm } from '@/components/SiteVisitForm'
import { FaFilePdf } from 'react-icons/fa'
import Link from 'next/link'
import { ZoningSubForm } from '@/components/ZoningSubmit'
import AcceptJobButton from '@/components/AcceptButton'
import { LCSearchSubForm } from '@/components/SeachReport'

type PageParams = {
  params: { slug: string },
  searchParams?: { q?: string }
}

const page = async({ params, searchParams }: PageParams) => {
  const JobProjectID = await params
  const user = await getLoggedInUser()
  const JobProjectDetails = await getJobListingbyID(JobProjectID.slug)
  console.log(JobProjectDetails)
  const landID = JobProjectDetails?.LandID 
  const LandDetails = await getLandById(landID)
  console.log(LandDetails)
  const serviceProvider  = await getserviceProviderData(user.email)



  // Role flags
  const isSurveyor = serviceProvider?.profession === 'Surveyor';
  const isPlanner = serviceProvider?.profession === 'Planner';
  const isLawyer = serviceProvider?.profession === 'Lawyer'
  const purchase_stage = JobProjectDetails?.Purchase_Stage_Paid
  const Registraion_stage = JobProjectDetails?.Registration_stage
 

  return (
    
      
      <main className='flex flex-col gap-y-10 max-w-4xl mx-auto '>

        <div className='flex flex-row justify-between items-center'>
        {isSurveyor && ( <Header2 backText='Back' title='Site Visit' subText='Visit Site Location to inspect and make report'/>)}
        {isPlanner && ( <Header2 backText='Back' title='Zoning Search' subText='Search the land zoning'/>)}
        {isLawyer && ( <Header2 backText='Back' title='Lands Commission Search' subText='Search the land at lands Commission'/>)}

      {/* Conditional Accept Button */}
      {(isSurveyor || isPlanner || isLawyer) && (
        <AcceptJobButton
        jobId={JobProjectID.slug}
        userEmail={user.email}
        /* @ts-ignore */
        role={isPlanner ? 'Planner' : isSurveyor ? 'Surveyor' : isLawyer ? 'Lawyer' :''}
        isAlreadyAssigned={
      (isPlanner && JobProjectDetails?.PlannerInCharge === user.email) ||
      (isSurveyor && JobProjectDetails?.SurveyorInCharge === user.email) ||
      (isLawyer && JobProjectDetails?.LawyerInCharge === user.email)
    }
  />
)}
        {isSurveyor && JobProjectDetails?.SurveyorInCharge === user.email && (
          <p className='font-bold text-green-400 ring-1 ring-green-400 p-3 rounded-xl'>
            Assigned to you (Surveyor)
          </p>
        )}
        {isPlanner && JobProjectDetails?.PlannerInCharge === user.email && (<p className='font-bold text-blue-400 ring-1 ring-blue-400 p-3 rounded-xl'>Assigned to you (Planner)</p> )}
        
        {isLawyer && JobProjectDetails?.LawyerInCharge === user.email && (
          <p className='font-bold text-blue-400 ring-1 ring-blue-400 p-3 rounded-xl'>
            Assigned to you (Lawyer)
          </p>
        )}
        


        </div>
       
        <Tabs defaultValue="details" className="">
        <TabsList>
        <TabsTrigger value="details">Project Details</TabsTrigger>

    {(isSurveyor && JobProjectDetails?.SurveyorInCharge === user.email) ||
      (isPlanner && JobProjectDetails?.PlannerInCharge === user.email) ||
      (isLawyer && JobProjectDetails?.LawyerInCharge === user.email) ? (
      <>
      <TabsTrigger value="Submission">Submission</TabsTrigger>
      <TabsTrigger value="SiteReport">Uploaded Report</TabsTrigger>
    </>
  ) : null}
</TabsList>
        <TabsContent value="details" className='flex flex-col gap-y-4'>
           {/* @ts-ignore */}
        <div><LandCard land={LandDetails}  agreedPrice={LandDetails?.Price}/></div>

        {(isPlanner || isSurveyor || isLawyer) && ( <Link href={`${JobProjectDetails?.SitePlan}/view?project=6771516200333a41d2ef&mode=admin`}> View Site Plan</Link>)}
       
      
     {isSurveyor && (
          <div className='flex flex-col gap-y-4' >
          <p className = 'font-bold text-black text-xl mt-3'>Instruction For Surveyor</p>

          <div className='bg-gray-200 w-[700px] ring-2 rounded-xl ring-primary'>

          <p className='text-sm text-primary p-5'>{JobProjectDetails?.SiteVisitNote} </p>
          </div>
        </div>

     )}   
        </TabsContent>
        <TabsContent value="Submission">
          {/* @ts-ignore */}
         {isSurveyor && <SiteVisitForm JobProjectID = {JobProjectDetails?.$id}/>} 
          {/* @ts-ignore */}
         {isPlanner && <ZoningSubForm JobProjectID = {JobProjectDetails?.$id}/>} 
          {/* @ts-ignore */}
         {isLawyer && <LCSearchSubForm JobProjectID = {JobProjectDetails?.$id}/>} 
          {/* @ts-ignore */}
         {(isLawyer && purchase_stage) && <LCSearchSubForm JobProjectID = {JobProjectDetails?.$id}/>} 
          {/* @ts-ignore */}
         {(isLawyer && Registraion_stage) && <LCSearchSubForm JobProjectID = {JobProjectDetails?.$id}/>} 
        </TabsContent>
        <TabsContent value="SiteReport">
        <div className="mt-4">
  <h3 className="text-lg font-medium mb-2">Site Documents</h3>
  <div className="border rounded-lg overflow-hidden">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Type</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
  {isSurveyor && (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <FaFilePdf className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-sm font-medium text-gray-900">Site Visit Report</span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
        {JobProjectDetails?.SiteVisitReport ? (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              Submitted
            </span>
          ) : (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
              Not Submitted
            </span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {JobProjectDetails?.SiteVisitReport ? (
            <Link
              href={`${JobProjectDetails.SiteVisitReport}/view?project=6771516200333a41d2ef&mode=admin`}
              className="text-blue-600 hover:text-blue-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              View PDF
            </Link>
          ) : (
            <span className="text-gray-400">No file available</span>
          )}
        </td>
      </tr>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <FaFilePdf className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-sm font-medium text-gray-900">Site Plan</span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {JobProjectDetails?.SitePlan ? (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              Submitted
            </span>
          ) : (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
              Not Submitted
            </span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {JobProjectDetails?.SitePlan ? (
            <Link
              href={`${JobProjectDetails.SitePlan}/view?project=6771516200333a41d2ef&mode=admin`}
              className="text-blue-600 hover:text-blue-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              View PDF
            </Link>
          ) : (
            <span className="text-gray-400">No file available</span>
          )}
        </td>
      </tr>
    </>
  )}

  {isPlanner && (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <FaFilePdf className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-sm font-medium text-gray-900">Zoning Report</span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {JobProjectDetails?.PlannerReport ? (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              Submitted
            </span>
          ) : (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
              Not Submitted
            </span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {JobProjectDetails?.PlannerReport ? (
            <Link
              href={`${JobProjectDetails.PlannerReport}/view?project=6771516200333a41d2ef&mode=admin`}
              className="text-blue-600 hover:text-blue-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              View PDF
            </Link>
          ) : (
            <span className="text-gray-400">No file available</span>
          )}
        </td>
      </tr>
    </>
  )}
  {isLawyer && (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <FaFilePdf className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-sm font-medium text-gray-900">Lands Commission Search Report</span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {JobProjectDetails?.LawyerSearchReport ? (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              Submitted
            </span>
          ) : (
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
              Not Submitted
            </span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {JobProjectDetails?.PlannerReport ? (
            <Link
              href={`${JobProjectDetails.LawyerSearchReport}/view?project=6771516200333a41d2ef&mode=admin`}
              className="text-blue-600 hover:text-blue-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              View PDF
            </Link>
          ) : (
            <span className="text-gray-400">No file available</span>
          )}
        </td>
        
      </tr>
    </>
  )}
</tbody>

    </table>
  </div>
</div>
        </TabsContent>
      </Tabs>
        
       
       

      </main>

  )
}

export default page