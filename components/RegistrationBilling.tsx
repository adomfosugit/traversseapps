import React from 'react'
import BankPaymentCard from './BankPaymentCard';
import RegistrationPaymentCard from './RegistrationPaymentCard';


type Props = {
  user:{
    name:string;
    email:string
  },
  landID:string,
  projectID:string,
  agreedPrice : number
}

const RegistrationBilling = ({user, landID, projectID, agreedPrice }: Props) => {
    
  return (
    <div className=' flex flex-row w-full '>
            <div className='flex flex-row  '>
        
            <RegistrationPaymentCard email = {user.email} name = {user.name} land = {landID} project = {projectID} agreedPrice= {agreedPrice} />
            </div>
        
    </div>
  )
}

export default RegistrationBilling;