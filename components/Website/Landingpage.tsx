'use client'
import { Laptop } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
type Props = {}

const Landingpage = (props: Props) => {
  const router =useRouter()
  const navigateUserEntry = () => {
    router.push('/user-entry/sign-in')
  } 
  const navigateServiceProvider = () => {
    router.push('/service-provider/sign-in')
  } 
  
  return (
    <div className=" bg-[url('/assets/landing.svg')] bg-cover min-h-screen flex items-center">
            <div className='flex max-w-6xl mx-auto'>
          {/* {banner content} */}
          <div className=" flex flex-col text-white items-center justify-center text-center">
            
              <p className="text-xl lg:text-5xl font-bold font-inter items-center flex ">
              • Build Remotely • Build in Africa
              </p>
              <p className="text-sm lg:text-xl ">
                100% Fully remote, collaborative, end-to-end, property acquisition,
                development & monetization.
              </p>
              <div className='m-4'></div>
           
              <Dialog>
                <DialogTrigger className='w-[200px] h-10 ring-1 ring-neutral-50 bg-primary rounded-sm'>Sign In</DialogTrigger>
                <DialogContent className='py-5'>
                  <DialogHeader>
                    <DialogTitle className='text-primary mb-5'>Traverse</DialogTitle>
                     <Button variant={'outline'}  className='py-5 border-zinc-300 hover:bg-primary hover:text-white hover:border-neutral-50 '  onClick={navigateUserEntry}>Client Sign In</Button>
                     <Button variant={'outline'} className='py-5 border-zinc-300 hover:bg-primary hover:text-white hover:border-neutral-50' onClick={navigateServiceProvider}>Service Provider Sign In</Button>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
         </div>
        </div>
    </div>
  )
}

export default Landingpage