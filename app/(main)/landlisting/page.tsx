import React from 'react'
import LandCard from './LandCard'
import { faqs } from '@/constants'

type Props = {}
// implement infinite scrolling for the landitems
const page = (props: Props) => {
  return (
    <div className='flex flex-col mx-auto max-w-4xl'>
        {faqs.map((item,index)=> (

        <LandCard key={index}/>
        ))}
    </div>
  )
}

export default page