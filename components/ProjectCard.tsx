import Image from 'next/image'
import React from 'react'
import {Card,CardContent } from "@/components/ui/card"
import Link from 'next/link';
import {Tooltip,TooltipContent,TooltipProvider,TooltipTrigger,} from "@/components/ui/tooltip"

type Props = {
    name:string;
    imgSrc:string;
    comment?:string;
    link:string;
    disabled?:boolean;
}

const ProjectCard = (props: Props) => {
  return (

   <div className='w-full h-full'>

 
    <Link href={props.link} >

    <Card>

    <CardContent className='w-full p-0 h-45'>
    
     
    <Image src={props.imgSrc} alt={props.name} width={50} height={50} className={`w-full h-full ${props.disabled ? 'opacity-50' : ''}`} />

    </CardContent>
 
    </Card>

    </Link>
    <TooltipProvider>
    <Tooltip>
    <TooltipTrigger> <p className='text-wrap text-primary text-sm text-center mt-2'>{props.name}</p></TooltipTrigger>
    <TooltipContent className='w-[250px] h-[100px] text-wrap text-primary text-xs bg-slate-100'>
      <p className='p-2'>{props.comment}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
   
    </div>
  )
}

export default ProjectCard