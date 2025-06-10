import Header2 from '@/app/dashboard/Dash/Header2'
import LandCard from '@/components/LandCard1'
import { Button } from '@/components/ui/button'
import { AssignSurveyorJob, getJobListingbyID, getLandById, getLoggedInUser } from '@/lib/Appwrite/api'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteVisitForm } from '@/components/SiteVisitForm'
import { FaFilePdf } from 'react-icons/fa'
import Link from 'next/link'

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
       
        {
          /* @ts-ignore */
          JobProjectDetails?.Available && (<Button onClick={handleAccept()}>Accept</Button>)
        }
          {
            JobProjectDetails?.SurveyorInCharge == user.email ? (<p className='font-bold text-green-400 ring-1 ring-green-400 p-3 rounded-xl '>Assigned to you</p>) : ''
          }


        </div>
       
        <Tabs defaultValue="details" className="">
        <TabsList>
          <TabsTrigger value="details">Project Details</TabsTrigger>
          <TabsTrigger value="Submission">Submission</TabsTrigger>
          <TabsTrigger value="SiteReport">Uploaded Report</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className='flex flex-col gap-y-4'>
           {/* @ts-ignore */}
        <div >       <LandCard land={LandDetails}  agreedPrice={LandDetails?.Price}/></div>
        <div className='flex flex-col gap-y-4' >
          <p className = 'font-bold text-black text-xl mt-3'>Instruction For Surveyor</p>

          <div className='bg-gray-200 w-[700px] ring-2 rounded-xl ring-primary'>

          <p className='text-sm text-primary p-5'>{JobProjectDetails?.SiteVisitNote} </p>
          </div>
        </div>
        </TabsContent>
        <TabsContent value="Submission">
          {/* @ts-ignore */}
          <SiteVisitForm JobProjectID = {JobProjectDetails?.$id}/>
        </TabsContent>
        <TabsContent value="SiteReport">
          <Link href= {`${JobProjectDetails?.SiteVisitReport}/view?project=6771516200333a41d2ef&mode=admin`}>
            <FaFilePdf className='w-[25px] h-[20px]'/> Site Visit Report
          </Link>
          
        </TabsContent>
      </Tabs>
        
       
       

      </main>

  )
}

export default page