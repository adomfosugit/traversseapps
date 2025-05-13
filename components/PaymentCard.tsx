import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from './ui/label'
import { Input } from './ui/input'
type Props = {}

const PaymentCard = (props: Props) => {
  return (
    <div className='p-12'>
        <Card className="w-[350px] h-[550px] bg-gray-100">
      <CardHeader className='my-10'>
        <CardTitle>Your Order</CardTitle>
      
      </CardHeader>
      <CardContent className='flex flex-col text-sm gap-y-10 '>
        <div className='flex justify-between'>

        <p>Site Visit & Survey  </p>
        <p className='font-bold'>GHS 0.00 </p>
        </div>
        <div className='flex justify-between'>

        <p>Lands Commissions Search  </p>
        <p className='font-bold'>GHS 0.00 </p>
        </div>
        <div className='flex justify-between'>

        <p>Legal Advice  </p>
        <p className='font-bold'>GHS 0.00 </p>
        </div>
        <div className='flex justify-between'>

        <p>Barcoded Site Plan </p>
        <p className='font-bold'>GHS 0.00 </p>
        </div>
        <div className='flex justify-between'>

        <p>Service Fee </p>
        <p className='font-bold'>GHS 0.00 </p>
        </div>
        <div className='flex justify-between'>

        <p>Total </p>
        <p className='font-bold'>GHS 0.00 </p>
        </div>
    
       
      </CardContent>
      <CardFooter className="mx-auto w-full">
       
        <Button className='w-full'>Pay</Button>
      </CardFooter>
    </Card>
        
    </div>
  )
}

export default PaymentCard