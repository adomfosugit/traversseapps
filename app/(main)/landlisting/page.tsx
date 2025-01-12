'use client'
import React, { useState } from 'react'
import LandCard from './LandCard'
import { faqs } from '@/constants'
import Drawer from '@/components/Drawer'
import Filter from '@/components/Filter'
import { Button } from '@/components/ui/button'
import SHeader from '@/components/SHeader'
import { ListFilter } from 'lucide-react'

type Props = {}
// implement infinite scrolling for the landitems
const page = (props: Props) => {
 const [showfilter,SetShowFilter] = useState(false);
 const showSubNav = () => SetShowFilter(!showfilter)
  return (

    <div className='flex '>
     <aside className="hidden lg:flex w-1/4 text-sm ">
        <Drawer />
      </aside>
    <main className='flex flex-col mx-auto max-w-4xl mt-12'>
        <div className='flex justify-between mb-4'>
          <SHeader />
          <Button variant={'outline'} onClick={showSubNav}> <ListFilter/> Filter</Button>
        </div>
        {showfilter ?   <Filter /> : ''}
      
        {faqs.map((item,index)=> (

        <LandCard key={index}/>
        ))}
    </main>
    
    </div>
  )
}

export default page