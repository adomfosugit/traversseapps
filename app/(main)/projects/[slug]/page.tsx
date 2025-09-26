import Header2 from '@/app/dashboard/Dash/Header2'
import BillingDetails from '@/components/BillingDetails'
import Drawer from '@/components/Drawer'
import LandCard from '@/components/LandCard1'
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
  const LandDetails = await getLandById(LandID)
  const JOBID  = await getJobListingByUserProjectID(landProjectID.slug)
  console.log(JOBID)

  const headerContent = getHeaderContent(pageID)
  

  return (
    <div className='flex gap-x-20'>
      <aside className="hidden lg:flex w-1/4 text-sm ">
        <Drawer path={landProjectID}  stages={{Land_selection: LandProjectDetails?.Land_selection,Pay_prepurchase: LandProjectDetails?.Pay_prepurchase,Site_visit: LandProjectDetails?.Site_visit,planning_zoning: LandProjectDetails?.planning_zoning,LC_search: LandProjectDetails?.LC_search,
          legal_advice: LandProjectDetails?.legal_advice,Land_Payment_Purchase: LandProjectDetails?.Land_Payment_Purchase,Sales_Purchase: LandProjectDetails?.Sales_Purchase,Conveyance: LandProjectDetails?.Conveyance,Oath_Proof: LandProjectDetails?.Oath_Proof, Mail_Document_Sign_off: LandProjectDetails?.Mail_Document_Sign_off, Stamp_Duty: LandProjectDetails?.Stamp_Duty,Concurrence_Processing: LandProjectDetails?.Concurrence_Processing,Parcel_preparation: LandProjectDetails?.Parcel_preparation,Land_Title_Certificate: LandProjectDetails?.Land_Title_Certificate, }} />
      </aside> 
      <main className='flex flex-col mx-auto gap-y-10'>
        <Header2 
          backText='Back' 
          title={headerContent.title} 
          subText={headerContent.subText} 
        />
        
        {/* @ts-ignore */}
        <LandCard land={LandDetails} agreedPrice={LandProjectDetails?.bid.Offer_Price}/>

        {pageID === 'Pay_prepurchase' && (LandProjectDetails?.Site_visit ?  <div className="flex items-center justify-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full border border-2 border-green-200 w-3/4">
      <p className='text-center'> Pre-Purchase Stage Payment Complete ✓</p>
    </div>  :   <BillingDetails user = {user} landID = {LandID} projectID = {landProjectID.slug} />)}
        {/* @ts-ignore */}
        {pageID === 'Site_visit' && <Sitevisit JobAssignedID = {JOBID[0].$id} JobSiteVistNote = {JOBID[0]?.SiteVisitNote} Report = {JOBID[0]?.SiteVisitReport } SitePlan = {JOBID[0]?.SitePlan}/>}
          {/* @ts-ignore */}
        {pageID === 'planning_zoning' && <Link href= {`${JOBID[0]?.PlannerReport}/view?project=6771516200333a41d2ef&mode=admin`}> Zoning Report</Link>}
          {/* @ts-ignore */}
        {pageID === 'LC_search' && <Link href= {`${JOBID[0]?.LawyerSearchReport}/view?project=6771516200333a41d2ef&mode=admin`}> Lands Commission Search Report</Link>}
          {/* @ts-ignore */}
        {pageID === 'legal_advice' && <p> Lawyer Legal advice uploaded should show here(TBWO)</p>}
          {/* @ts-ignore */}
        {pageID === 'Land_Payment_Purchase' && (LandProjectDetails?.Funds_transfer ? <div className='ring-2 p-2 ring-green-600 bg-green-200 w-[800px] rounded-xl'> Land fund Fees Paid</div>   :   <BillingDetails user = {user} landID = {LandID} projectID = {landProjectID.slug} />)}
        {/* @ts-ignore */}
        {pageID === 'Sales_Purchase' && <Link  className = 'text-blue-400 text-link '  href= {`${JOBID[0]?.SalesandPurchaseAgreement}/view?project=6771516200333a41d2ef&mode=admin`}> Sales and Purchase Agreement</Link>}
        {/* @ts-ignore */}
        {pageID === 'Conveyance' && <Link className = 'text-blue-400 text-link '   href= {`${JOBID[0]?.PlannerReport}/view?project=6771516200333a41d2ef&mode=admin`}> Conveyance</Link>}
        {/* @ts-ignore */}
        {pageID === 'Oath_Proof' && <Link className = 'text-blue-400 text-link '  href= {`${JOBID[0]?.Conveyance}/view?project=6771516200333a41d2ef&mode=admin`}> Oath of Proof</Link>}
        {/* @ts-ignore */}
        {pageID === 'Mail_Document_Sign_off' && <Link className = 'text-blue-400 text-link '  href= {`${JOBID[0]?.PlannerReport}/view?project=6771516200333a41d2ef&mode=admin`}> Mail Document Sign Off</Link>}
      
      {/* Land Registration continues here */}
      
      
      
      </main>
    </div>
  )
}

export default page