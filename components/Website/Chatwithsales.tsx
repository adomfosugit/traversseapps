import React from 'react'
import { Button } from '../ui/button'

type Props = {}

const Chatwithsales = (props: Props) => {
  return (
    <div className='flex flex-col items-center mt-10 mx-auto max-w-3xl text-center gap-y-5 py-12'>
        <h1 className='text-xl lg:text-3xl font-semibold text-zinc-800 text-center'>Seamless and transparent real estate acquisition</h1>

        <p className='text-sm lg:text-xl text-neutral-600'>Traverse is your end-to-end real estate portal that facilitate your
           property acquisition remotely. 
           The app brings on board all professionals in 
           the built environment to steer your property acquisition
            journey. All professional on the portal  are certified by  
            their respective  professional body. Your location should be
             an impediment to your property acquisition desires. </p>
      
    </div>
  )
}

export default Chatwithsales