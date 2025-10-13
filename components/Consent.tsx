'use client'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { UpdateUserProceedLandpurchase } from '@/lib/Appwrite/api'

import { toast } from "@/hooks/use-toast"

const Consent = ({id}:{id:string}) => {

        
  const handleProceed = async () => {
    try {
      const result = await UpdateUserProceedLandpurchase(id)
      console.log(id)

      if (result?.success) {
        toast({
          title: 'Success',
          description: 'You may now proceed to the purchase stage.',
        })
      } else {
        toast({
          title: 'Failed',
          description: 'Unable to update purchase status. Please try again.',
          variant: 'destructive',
          
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: 'Unexpected error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    }
  }
  return (
    <div>
                      <Dialog>
                <DialogTrigger className='w-[200px] h-10 ring-1 ring-neutral-50 bg-primary text-white rounded-sm justify-end'>Continue</DialogTrigger>
                <DialogContent className='py-5'>
                  <DialogHeader>
                    <DialogTitle className='text-primary mb-5'>Traverse</DialogTitle>
                    <p>Please carefully review all submitted documents.  If you are satisfied with the information provided,  click <strong>Proceed</strong> to give your consent and move to the purchase stage.</p>
                     <Button variant={'outline'} className='py-5 border-zinc-300 hover:bg-primary hover:text-white hover:border-neutral-50' onClick={handleProceed}>Proceed</Button>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
    </div>
  )
}

export default Consent