
import Header2 from '@/app/dashboard/Dash/Header2'
import LandCard from '@/components/LandCard1'
import { Button } from '@/components/ui/button'
import { AssignSurveyorJob, getJobListingbyID, getLandById, getLoggedInUser } from '@/lib/Appwrite/api'

type PageParams = {
  params: { slug: string },
  searchParams?: { q?: string }
}



const page = async({ params, searchParams }: PageParams) => {
  const JobProjectID = await params
  const user = await getLoggedInUser()
  //const pageID = searchParams?.q
  const JobProjectDetails = await getJobListingbyID(JobProjectID.slug)
  console.log(JobProjectDetails)
  const landID = JobProjectDetails?.LandID 
  const LandDetails = await getLandById(landID)
  console.log(LandDetails)
  const handleAccept = async () => {
    
    const result = await AssignSurveyorJob(JobProjectID.slug, user?.email);
   

    if (result.success) {
      console.log('Job has been assigned to you successfully')
      // optionally refetch or redirect here
    } else {
      console.log(`${result.error}`);
    }
  };
  

  return (
    
      
      <main className='flex flex-col gap-y-10 max-w-4xl mx-auto '>

        <div className='flex flex-row justify-between items-center'>
        <Header2 
          backText='Back' 
          title='Site Visit' 
          subText='Visit Site Location to inspect and make report'
        />
        {/* @ts-ignore */}
        <Button onClick={handleAccept()}>Accept</Button>

        </div>
       
        
        {/* @ts-ignore */}
        <div >       <LandCard land={LandDetails}  agreedPrice={LandDetails?.Price}/></div>
        <div className='flex flex-col gap-y-4' >
          <p className = 'font-bold text-black text-xl'>Instruction For Surveyor</p>

          <div className='bg-gray-200 w-[700px] ring-2 rounded-xl ring-primary'>

          <p className='text-sm text-primary p-5'>{JobProjectDetails?.SiteVisitNote} </p>
          </div>
        </div>

      </main>

  )
}

export default page