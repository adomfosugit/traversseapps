import ProjectCard from '@/components/ProjectCard'
import { projectlist } from '@/constants'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='flex flex-col mx-auto max-w-4xl justify-center items-center gap-y-5  py-3 lg:py-12'>
        <h1 className='  items-center justify-center text-center text-primary '> Hello  <span className='text-primary font-old m-2'>User</span>Choose the pathway that best suit your property acquisition journey</h1>
        <div className='flex flex-col gap-y-4 lg:flex-row gap-x-5 justify-center '>
            {projectlist.map((item) => (
              
                <ProjectCard key={item.name} name={item.name} imgSrc={item.imgSrc} comment={item.comment} link={item.link} disabled={item.status}/>
              
            ))}
        </div>
    </div>
  )
}

export default page
