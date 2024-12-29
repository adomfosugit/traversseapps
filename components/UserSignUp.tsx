'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import {z} from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation';
import { createUserAccount } from '@/lib/Appwrite/api';
import { toast } from '@/hooks/use-toast';
type Props = {}

const formSchema = z.object({
  Name: z.string({required_error:'Name Required'}) ,
  Email: z.string({required_error:'Email required'}).email('Please Enter a Valid Email'),
  Password: z.string({required_error:'Password is required'})
})

const UserSignUp = (props: Props) => {
  
  const router = useRouter()
  const [isLoading, setIsLoading] =  useState<boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    Name: "",
    Email: "",
    Password: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
  
    const user = await createUserAccount(values)
    if(!user) { toast({title: 'Sign Up failed. User Already exists'})
      return 
    }
    {toast({variant:'default',title: 'Sign Up Succesful'})}
    router.push('/user-entry/sign-in')
    
  }
  return (
    <div className='w-full shadow-2xl p-12 '>

    <div className=' w-full flex flex-col items-start gap-y-[20px]  '>
 
      <div>
        <h1 className='text-xl font-semibold'>Welcome to Traverse</h1>
        <h1 className='text-sm text-zinc-500'>Please create your account</h1>
      </div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
      <FormField
          control={form.control}
          name="Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} type='password'/>
              </FormControl>
              <FormMessage />
           
            </FormItem>
          )}
        />
        <Button type="submit" className='w-full'>{isLoading ? 
        <div className='flex-center'>  Loading...</div>
          : 'Sign Up'} </Button>
      </form>
    </Form>
      </div>

    
    
      
    </div>
    
  )
}

export default UserSignUp