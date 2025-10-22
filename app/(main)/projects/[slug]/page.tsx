import Header2 from '@/app/dashboard/Dash/Header2'
import BankBilling from '@/components/BankBilling'
import BillingDetails from '@/components/BillingDetails'
import Consent from '@/components/Consent'
import Drawer from '@/components/Drawer'
import LandCard from '@/components/LandCard1'
import RegistrationBilling from '@/components/RegistrationBilling'
import { Sitevisit } from '@/components/Sitevist'
import { getJobListingByUserProjectID, getLandById, getLandProjectByID, getLoggedInUser } from '@/lib/Appwrite/api'
import Link from 'next/link'


type PageParams = {
  params: { slug: string },
  searchParams?: { q?: string }
}


const getHeaderContent = (pageID?: string) => {
  switch(pageID) {
    case 'land_selection':
      return {
        title: 'Land Selection',
        subText: ' Find the cost and other closing considerations below. '
      }
    case 'Pay_prepurchase':
      return {
        title: 'Pay Pre- Purchase Stage Fees',
        subText: 'Pre-purchase payment goes toward site inspection, interim site plan preparation, as well as all due diligence and legal advice pertaining to your on your transaction '
      }
    case 'planning_zoning':
      return {
        title: 'Planning and Zoning',
        subText: 'Land Zoning '
      }
    case 'LC_search':
      return {
        title: 'Lands Commission search',
        subText: 'Due Diligence at the Lands Commission verifies the Government status of your land listing '
      }
    case 'legal_advice':
      return {
        title: 'Legal Advice',
        subText: 'A legal review of your proposed transaction is uploaded here '
      }
    case 'Site_visit':
      return {
        title: 'Surveyor Site Visit',
        subText: 'A surveyor’s report establishes the boundaries of your choosen land and enables preparation of a site plan for due diligence '
      }
    case 'Land_Payment_Purchase':
      return {
        title: 'Land Payment and Purchase',
        subText: 'purchase payment goes toward land payments, conveyancing, & cadastral site plan pre interim site plan preparation'
      }
    case 'Sales_Purchase':
      return {
        title: 'Sales & Purchase Agreement',
        subText: 'The S&PA outlines the terms of the transaction between you and the seller. The S&PA requires your signature and the signature of a witness '
      }
    case 'Conveyance':
      return {
        title: 'Conveyance',
        subText: 'A deed of lease, sub -lease, or assignment based on the agreement laid out in the sales and purchase agreement'
      }
    case 'Oath_Proof':
      return {
        title: 'Oath of Proof',
        subText: 'Oath of Proof'
      }
    case 'Registration':
      return {
        title: 'Land Registration',
        subText: 'Registration stage consists of Stamp Duty'
      }
    case 'Stamp_Duty':
      return {
        title: 'Stamp Duty',
        subText: 'Registration stage consists of Stamp Duty'
      }
    case 'Concurrence_Processing':
      return {
        title: 'Concurrence Processing',
        subText: 'Registration stage consists of Stamp Duty'
      }
    case 'Parcel_preparation':
      return {
        title: 'Parcel Preparation',
        subText: 'Registration stage consists of Stamp Duty'
      }
    case 'Land_Title_Certificate':
      return {
        title: 'Land Title Certificate',
        subText: 'Registration stage consists of Stamp Duty'
      }
    default:
      return {
        title: 'Project Overview',
        subText: 'View all details about your project'
      }
  }
}

const page = async({ params, searchParams }: PageParams) => {
  const landProjectID = await params
  const user = await getLoggedInUser()
  const pageID = await searchParams?.q
  const LandProjectDetails = await getLandProjectByID(landProjectID.slug)
  const LandID = LandProjectDetails?.bid.LandId 
  const offerPrice = LandProjectDetails?.bid.Offer_Price
  const LandDetails = await getLandById(LandID)
  const JOBID = await getJobListingByUserProjectID(landProjectID.slug)
  console.log(offerPrice)


   const jobListing = JOBID?.[0]
   if (!jobListing) {
     return <div>No job listing found</div>
   }

  const headerContent = getHeaderContent(pageID)
  

  return (
    <div className='flex gap-x-20'>
      <aside className="hidden lg:flex w-1/4 text-sm ">
        <Drawer path={landProjectID}  stages={{Land_selection: LandProjectDetails?.Land_selection,Pay_prepurchase: LandProjectDetails?.Pay_prepurchase,Site_visit: LandProjectDetails?.Site_visit,planning_zoning: LandProjectDetails?.planning_zoning,LC_search: LandProjectDetails?.LC_search, legal_advice: LandProjectDetails?.legal_advice,Land_Payment_Purchase: LandProjectDetails?.Land_Payment_Purchase,Sales_Purchase: LandProjectDetails?.Sales_Purchase,Conveyance: LandProjectDetails?.Conveyance,Oath_Proof: LandProjectDetails?.Oath_Proof, Mail_Document_Sign_off: LandProjectDetails?.Mail_Document_Sign_off, Registration:LandProjectDetails?.RegistrationFees, Stamp_Duty: LandProjectDetails?.Stamp_Duty,Concurrence_Processing: LandProjectDetails?.Concurrence_Processing,Parcel_preparation: LandProjectDetails?.Parcel_preparation,Land_Title_Certificate: LandProjectDetails?.Land_Title_Certificate, }} />
      </aside> 
      <main className='flex flex-col mx-auto gap-y-3'>
                                                          
          <div className='flex w-3/4 justify-end mt-1'>
              {/* @ ts-ignore */}

              {pageID === 'legal_advice' && ( LandProjectDetails?.legal_advice != null   ? <Consent id={JOBID[0]?.$id} />  : <p></p>)}

              
          </div>
        <Header2 
          backText='Back' 
          title={headerContent.title} 
          subText={headerContent.subText} 
         
        />
        
        {/* @ts-ignore */}
        <LandCard land={LandDetails} agreedPrice={LandProjectDetails?.bid.Offer_Price}/>

        {pageID === 'Pay_prepurchase' && (LandProjectDetails?.Site_visit ? 
  <div className="flex items-center justify-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full border border-2 border-green-200 w-3/4">
    <p className='text-center'>Pre-Purchase Stage Payment Complete ✓</p>
  </div> : 
  <BillingDetails user={user} landID={LandID} projectID={landProjectID.slug} />
)}

{/* @ts-ignore */}
{pageID === 'Site_visit' && <Sitevisit JobAssignedID={JOBID[0].$id} JobSiteVistNote={JOBID[0]?.SiteVisitNote} Report={JOBID[0]?.SiteVisitReport} SitePlan={JOBID[0]?.SitePlan}/>}

{pageID === 'planning_zoning' && (
  <div className="w-3/4 border border-2 rounded-xl border-primary p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div>
          <p className="text-sm text-primary font-medium">From Urban Planner</p>
          <h3 className="font-semibold text-gray-900">Zoning Report</h3>
        </div>
      </div>
      <Link 
        /* @ts-ignore */
        href={`${JOBID[0]?.PlannerReport}/view?project=6771516200333a41d2ef&mode=admin`}
        className="bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
      >
        <span>View Report</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </Link>
    </div>
  </div>
)}

{/* @ts-ignore */}
{pageID === 'LC_search' && (
  <div className="w-3/4 border border-2 rounded-xl border-primary p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div>
          <p className="text-sm text-primary font-medium">From Lawyer</p>
          <h3 className="font-semibold text-gray-900">Lands Commission Search Report</h3>
        </div>
      </div>
      <Link 
        href={`${JOBID[0]?.LawyerSearchReport}/view?project=6771516200333a41d2ef&mode=admin`}
        className="bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
      >
        <span>View Report</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </Link>
    </div>
  </div>
)}
{pageID === 'legal_advice' && (
  <div className="w-3/4 border border-2 rounded-xl border-primary p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div>
          <p className="text-sm text-primary font-medium">From Lawyer</p>
          <h3 className="font-semibold text-gray-900">Legal Advice</h3>
        </div>
      </div>
      <Link 
        href={`${JOBID[0]?.LegalAdvice}/view?project=6771516200333a41d2ef&mode=admin`}
        className="bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
      >
        <span>View Report</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </Link>
    </div>
  </div>
)}


{/* @ts-ignore */}
{pageID === 'Land_Payment_Purchase' && (LandProjectDetails?.Funds_transfer ? 
  <div className="flex items-center justify-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full border border-2 border-green-200 w-3/4">
    <p className='text-center'>Land Fund Fees Paid ✓</p>
  </div> : 
  <BankBilling user={user} landID={LandID} projectID={landProjectID.slug} agreedPrice = {offerPrice}/>
)}


{/* @ts-ignore */}
{pageID === 'Sales_Purchase' && (
  <div className="w-3/4 border border-2 rounded-xl border-primary p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div>
          <p className="text-sm text-primary font-medium">From Legal Department</p>
          <h3 className="font-semibold text-gray-900">Sales and Purchase Agreement</h3>
        </div>
      </div>
      <Link 
        href={`${JOBID[0]?.SalesandPurchaseAgreement}/view?project=6771516200333a41d2ef&mode=admin`}
        className="bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
      >
        <span>View Document</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </Link>
    </div>
  </div>
)}

{/* @ts-ignore */}
{pageID === 'Conveyance' && (
  <div className="w-3/4 border border-2 rounded-xl border-primary p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div>
          <p className="text-sm text-primary font-medium">From Legal Department</p>
          <h3 className="font-semibold text-gray-900">Conveyance Document</h3>
        </div>
      </div>
      <Link 
        href={`${JOBID[0]?.Conveyance}/view?project=6771516200333a41d2ef&mode=admin`}
        className="bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
      >
        <span>View Document</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </Link>
    </div>
  </div>
)}

{/* @ts-ignore */}
{pageID === 'Oath_Proof' && (
  <div className="w-3/4 border border-2 rounded-xl border-primary p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div>
          <p className="text-sm text-primary font-medium">From Legal Department</p>
          <h3 className="font-semibold text-gray-900">Oath of Proof</h3>
        </div>
      </div>
      <Link 
        href={`${JOBID[0]?.OathProof}/view?project=6771516200333a41d2ef&mode=admin`}
        className="bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
      >
        <span>View Document</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </Link>
    </div>
  </div>
)}

{/* @ts-ignore */}
{pageID === 'Mail_Document_Sign_off' && (
  <div className="w-3/4 border border-2 rounded-xl border-primary p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div>
          <p className="text-sm text-primary font-medium">From Administration</p>
          <h3 className="font-semibold text-gray-900">Mail Document Sign Off</h3>
        </div>
      </div>
      <Link 
        href={`${JOBID[0]?.MailDocumentSignOff}/view?project=6771516200333a41d2ef&mode=admin`}
        className="bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
      >
        <span>View Document</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </Link>
    </div>
  </div>
)}


{pageID === 'Registration' && (LandProjectDetails?.RegistrationFeesPaid ? 
  <div className="flex items-center justify-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full border border-2 border-green-200 w-3/4">
    <p className='text-center'>Registration Fees Paid ✓</p>
  </div> : 
  <RegistrationBilling user={user} landID={LandID} projectID={landProjectID.slug} agreedPrice = {offerPrice}/>
)}

{pageID === 'Stamp_Duty' && (
  <div className="w-3/4 border border-2 rounded-xl border-primary p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div>
          <p className="text-sm text-primary font-medium">From Lawyer</p>
          <h3 className="font-semibold text-gray-900">Stamp Duty</h3>
        </div>
      </div>
      <Link 
        href={`${JOBID[0]?.Stamp_Duty}/view?project=6771516200333a41d2ef&mode=admin`}
        className="bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
      >
        <span>View Document</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </Link>
    </div>
  </div>
)}
{pageID === 'Concurrence_Processing' && (
  <div className="w-3/4 border border-2 rounded-xl border-primary p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div>
          <p className="text-sm text-primary font-medium">From Lawyer</p>
          <h3 className="font-semibold text-gray-900">Concurrence Processing</h3>
        </div>
      </div>
      <Link 
        href={`${JOBID[0]?.Concurrence_Processing}/view?project=6771516200333a41d2ef&mode=admin`}
        className="bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
      >
        <span>View Document</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </Link>
    </div>
  </div>
)}
{pageID === 'Parcel_preparation' && (
  <div className="w-3/4 border border-2 rounded-xl border-primary p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div>
          <p className="text-sm text-primary font-medium">From Lawyer</p>
          <h3 className="font-semibold text-gray-900">Parcel Preparation</h3>
        </div>
      </div>
      <Link 
        href={`${JOBID[0]?.Parcel_preparation}/view?project=6771516200333a41d2ef&mode=admin`}
        className="bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
      >
        <span>View Document</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </Link>
    </div>
  </div>
)}
{pageID === 'Land_Title_Certificate' && (
  <div className="w-3/4 border border-2 rounded-xl border-primary p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div>
          <p className="text-sm text-primary font-medium">From Lawyer</p>
          <h3 className="font-semibold text-gray-900">Land title Certificate Issuance</h3>
        </div>
      </div>
      <Link 
        href={`${JOBID[0]?.Land_Title_Certificate}/view?project=6771516200333a41d2ef&mode=admin`}
        className="bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
      >
        <span>View Document</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </Link>
    </div>
  </div>
)}
      </main>
    </div>
  )
}

export default page