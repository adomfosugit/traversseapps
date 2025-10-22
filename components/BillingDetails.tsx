import React from 'react'
import PaymentCard from './PaymentCard'

type Props = {
  user:{
    name:string;
    email:string
  },
  landID:string,
  projectID:string
}

const BillingDetails = ({user, landID, projectID}: Props) => {

  return (
    <div className=' flex flex-row w-full '>
            <div className='flex flex-row  '>
            {/*<BillingDetailsForm /> */}
            <PaymentCard email = {user.email} name = {user.name} land = {landID} project = {projectID}/>
            </div>
        
    </div>
  )
}

export default BillingDetails