import UserSignIn from '@/components/UserSignIn'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='flex flex-col py-12 w-full'>
      <div>
        <h1 className='text-xl font-bold text-primary'>Sign In</h1>
      </div>
      <div className='flex mt-12 w-full mx-auto '><UserSignIn /></div>
    </div>
  )
}

export default page