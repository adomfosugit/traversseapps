import React from 'react'
import BillingDetailsForm from './BillingDetailsForm'
import PaymentCard from './PaymentCard'

type Props = {}

const BillingDetails = (props: Props) => {
  return (
    <div className='mt-20 flex flex-row w-full '>
            <div className='flex flex-row  '>
            <BillingDetailsForm />
            <PaymentCard />
            </div>
        
    </div>
  )
}

export default BillingDetails