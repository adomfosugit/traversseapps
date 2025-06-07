'use client'

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PaystackButton } from 'react-paystack'
import { updateLandProjectSiteVisit } from '@/lib/Appwrite/api'
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation'
type Props = {
  email: string
  name: string
  land: string
  project: string
}

const PaymentCard = ({ name, email, land, project }: Props) => {
  const router = useRouter()
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
  const reference = Math.floor(Math.random() * 1000000000)
  const amount = 953600 // In pesewas (GHS 9536.00)

  const componentProps = {
    email,
    amount,
    metadata: { name },
    publicKey,
    currency: 'GHS',
    text: "Pay Now",
    onSuccess: async () => {
      try {
        const result = await updateLandProjectSiteVisit(land, project)

        if (result.success) {
          toast({title: 'Job is being assigned. A confirmation email we be sent on job assignment'})
          router.refresh()
        } else {
          toast({title: 'unexpected error, Please try again'})
        }
      } catch (err) {
        console.error(err)
        alert("Unexpected error occurred.")
      }
    },
    onClose: () => {
      console.log("Payment modal closed.")
    },
  }

  return (
    <div className='p-12'>
      <Card className="w-[600px] h-[550px] bg-gray-100">
        <CardHeader className='my-10'>
          <CardTitle>Your Order</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col text-sm gap-y-2'>
          {[
            ['Site Visit & Survey', '1000.00'],
            ['Lands Commissions Search', '2500.00'],
            ['Legal Advice', '3000.00'],
            ['Sub-Total', '8500.00'],
            ['Service Fee', '850.00'],
            ['Covid', '8.50'],
            ['GetFund', '21.25'],
            ['NHIL', '21.25'],
            ['VAT', '135.15'],
            ['Total', '9536.15'],
          ].map(([label, value], index) => (
            <div key={index} className='flex justify-between'>
              <p>{label}</p>
              <p className='font-bold'>GHS {value}</p>
            </div>
          ))}
        </CardContent>
        <CardFooter className="mx-auto w-full">
          <PaystackButton
            className='bg-primary w-full text-white p-2 rounded-xl'
            {...componentProps}
          />
        </CardFooter>
      </Card>
    </div>
  )
}

export default PaymentCard
