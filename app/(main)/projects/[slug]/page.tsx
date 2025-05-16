import Header2 from '@/app/dashboard/Dash/Header2'
import BillingDetails from '@/components/BillingDetails'
import Drawer from '@/components/Drawer'
import LandCard from '@/components/LandCard1'
import { Sitevisit } from '@/components/Sitevist'
import { getLandById, getLandProjectByID } from '@/lib/Appwrite/api'

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
    case 'Site_plan_preparation':
      return {
        title: 'Site Plan Preparation',
        subText: 'An interim site plan provides verified boundaries of your land listing '
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
    default:
      return {
        title: 'Project Overview',
        subText: 'View all details about your project'
      }
  }
}

const page = async({ params, searchParams }: PageParams) => {
  const landProjectID = params
  const pageID = searchParams?.q
  const LandProjectDetails = await getLandProjectByID(landProjectID.slug)
  const LandID = LandProjectDetails?.bid.LandId 
  const LandDetails = await getLandById(LandID)

  const headerContent = getHeaderContent(pageID)

  return (
    <div className='flex gap-x-5'>
      <aside className="hidden lg:flex w-1/4 text-sm">
        <Drawer path={landProjectID}/>
      </aside> 
      <main className='flex flex-col mx-auto gap-y-6'>
        <Header2 
          backText='Back' 
          title={headerContent.title} 
          subText={headerContent.subText} 
        />
        
        {/* @ts-ignore */}
        <LandCard land={LandDetails} agreedPrice={LandProjectDetails?.bid.Offer_Price}/>

        {pageID === 'Pay_prepurchase' && <BillingDetails />}
        {pageID === 'Site_visit' && <Sitevisit />}
      </main>
    </div>
  )
}

export default page