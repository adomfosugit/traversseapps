import React from 'react'
import { Button } from './ui/button'

type Props = {}

const Filter = (props: Props) => {
  return (
    <div className='bg-gray-100 h-20 flex justify-between items-center p-2'>
        <div>filters</div>
        <div className=' flex gap-x-2'>
            <Button variant={'secondary'} className='ring-1 ring-red-600 text-red-600'>Reset</Button>
            <Button className='bg-green-700'>Apply</Button>
        </div>
    
    </div>
  )
}

export default Filter