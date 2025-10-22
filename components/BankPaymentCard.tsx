'use client'

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PaystackButton } from 'react-paystack'
import { updateLandProjectSiteVisit, UpdateUserLandProceedings } from '@/lib/Appwrite/api'
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation'
import { Separator } from "@/components/ui/separator"

type Props = {
  email: string
  name: string
  land: string
  project: string
  agreedPrice : number
}

const BankPaymentCard = ({ name, email, land, project, agreedPrice  }: Props) => {

  const router = useRouter()
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
  const reference = Math.floor(Math.random() * 1000000000)

  // Base services with prices
  const baseServices = [
    { label: 'Conveyance', price: 1000.00 },
    { label: 'Bar Code', price: 3500.00 },
    { label: 'Land Price (Closing bid value)', price: agreedPrice },
  ]

  // Calculate subtotal
  const subtotal = baseServices.reduce((sum, service) => sum + service.price, 0)

  // Fee calculations (as percentages of subtotal)
  const fees = [
    { label: 'Service Fee', rate: 0.10, amount: subtotal * 0.10 },
    { label: 'Covid', rate: 0.001, amount: subtotal * 0.001 },
    { label: 'GetFund', rate: 0.0025, amount: subtotal * 0.0025 },
    { label: 'NHIL', rate: 0.0025, amount: subtotal * 0.0025 },
    { label: 'VAT', rate: 0.015, amount: subtotal * 0.015 },
  ]

  // Calculate total fees
  const totalFees = fees.reduce((sum, fee) => sum + fee.amount, 0)
  const grandTotal = subtotal + totalFees
  
  // Amount in pesewas for Paystack
  const amount = Math.round(grandTotal * 100)

  const componentProps = {
    email,
    amount,
    metadata: { name },
    publicKey,
    currency: 'GHS',
    text: "Pay Now",
    onSuccess: async () => {
      try {
        const result = await  UpdateUserLandProceedings(project)

        if (result.success) {
          toast({title: 'Job is being assigned to a Lawyer to start proceedings. '})
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
    <div className=' flex '>
      <Card className="w-full  bg-white shadow-2xl border-0  overflow-hidden">
        <CardHeader className='pb-2'>
          <CardTitle className="text-1xl font-bold text-center">
            Payment Summary
          </CardTitle>
          <p className="text-gray-400 text-center text-sm mt-2">
            Complete your land services purchase below
          </p>
        </CardHeader>

        <CardContent className='px-2 py-2 '>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Services */}
            <div className="space-y-3 ">
              <div className=" p-3 rounded-xl ">
                <h3 className="text-base font-bold text-gray-800 mb-2 flex items-center">
                  Professional Services
                </h3>
                <div className="space-y-4">
                  {baseServices.map((service, index) => (
                    <div key={index} className='flex justify-between items-center  bg-white '>
                      <div className="flex items-center">
          
                        <span className="text-gray-800 font-medium text-xs">{service.label}</span>
                      </div>
                      <span className='font-bold text-gray-900 text-xs'>
                        {service.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-6" />
                
                <div className='flex justify-between items-center '>
                  <span className="font-bold text-gray-800 text-xs">Services Subtotal</span>
                  <span className='font-bold text-green-700 text-xs'>
                    GHS {subtotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Fees & Total */}
            <div className="space-y-3">
              <div className="p-3 rounded-xl">
                <h3 className="text-base font-bold text-gray-800 mb-6 flex items-center">
                  Fees & Taxes
                </h3>
                <div className="space-y-4">
                  {fees.map((fee, index) => (
                    <div key={index} className='flex justify-between items-center  bg-white rounded-lg shadow-sm '>
                      <div className="flex flex-col">
                        <div className="flex items-center">
      
                          <span className="text-gray-800 font-medium text-xs">{fee.label}</span>
                        </div>
                        <span className="text-xs text-gray-500 ml-5 mt-1">
                          {(fee.rate * 100).toFixed(2)}% of subtotal
                        </span>
                      </div>
                      <span className='font-bold text-gray-900 text-sm'>
                       {fee.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grand Total */}
              <div className=''>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm uppercase tracking-wide"> Total</span>
                    <div className="text-3xl font-bold mt-1">GHS {grandTotal.toFixed(2)}</div>
                  </div>
               
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl">
            
              <PaystackButton
                className='bg-primary  w-full text-white p-3 rounded-xl'
                {...componentProps}
              />
              
              
            
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BankPaymentCard