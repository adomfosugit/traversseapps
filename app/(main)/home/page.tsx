import ProjectCard from '@/components/ProjectCard'
import { projectlist } from '@/constants'
import { getLoggedInUser } from '@/lib/Appwrite/api'
import React from 'react'

type Props = {}

const  page = async (props: Props) => {
  const getUser = await getLoggedInUser()
  
  return (
    <div className='flex flex-col mx-auto max-w-5xl justify-center items-center lg:min-h-screen gap-y-5 mt--12 '>
   

        <h1 className='  items-center justify-center text-center text-primary text-xl'> Hello  <span className='text-primary font-bold m-2'>{getUser.name}</span>Choose the pathway that best suit your property acquisition journey</h1>
        <div className='flex flex-col gap-y-4 lg:flex-row gap-x-5 justify-center '>
            {projectlist.map((item) => (
              
                <ProjectCard key={item.name} name={item.name} imgSrc={item.imgSrc} comment={item.comment} link={item.link} disabled={item.status}/>
              
            ))}
     
      </div>
    </div>
  )
}
export default page;