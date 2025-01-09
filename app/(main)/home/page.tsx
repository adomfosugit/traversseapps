import { LocateIcon, MapPinCheckInside, SearchCheckIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    
    
    
    <div className='mx-32 mt-4 flex flex-col gap-y-2'>
      <h1 className='text-xl lg:text-3xl font-bold'>Begin your Journey</h1>
     


      <p className='text-gray-500'>Click the button below to start your project </p>
      <Link href='/startproject' >
      <div className='p-12 w-full lg:w-80 flex justify-center items-center border-2 border-zinc-200 rounded-2xl lg:h-80 hover:border-2 hover:border-zinc-800'><MapPinCheckInside size={100}/></div>
      </Link>
      <p className='font-bold'>Find new listing</p>
    </div>
  
  )
}

export default page