import React from 'react'
import { Button } from './ui/button'
import { FilterOps } from './FilterOps'

type Props = {}

const Filter = (props: Props) => {
  return (
    <div className='bg-gray-100 h-20 flex justify-between items-center p-2'>
        <div className='m-2 space-x-2' >
          <FilterOps name='Region' />
          <FilterOps  name='Price Range'/>
          <FilterOps name= 'Plot Size'/>
          <FilterOps name= 'Land Type'/>
          <FilterOps name= 'Land Use'/>
         

          
          </div>
        <div className=' flex gap-x-2'>
            <Button variant={'secondary'} className='ring-1 ring-red-600 text-red-600 '>Reset</Button>
            <Button className='bg-green-700 ring-1 ring-green-700 hover:bg-green-800'>Apply</Button>
        </div>
    
    </div>
  )
}

export default Filter