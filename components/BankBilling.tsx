import React from 'react'
import BankPaymentCard from './BankPaymentCard';


type Props = {
  user:{
    name:string;
    email:string
  },
  landID:string,
  projectID:string,
  agreedPrice : number
}

const BankBilling = ({user, landID, projectID, agreedPrice }: Props) => {
    
  return (
    <div className=' flex flex-row w-full '>
            <div className='flex flex-row  '>
            {/*<BillingDetailsForm /> */}
            <BankPaymentCard email = {user.email} name = {user.name} land = {landID} project = {projectID} agreedPrice= {agreedPrice} />
            </div>
        
    </div>
  )
}

export default BankBilling;