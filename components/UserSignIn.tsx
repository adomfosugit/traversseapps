'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import {z} from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { loginWithGoogle, signInAccount } from '@/lib/Appwrite/api';
type Props = {}

const formSchema = z.object({
  Email: z.string({required_error:'Email required'}).email('Please Enter a Valid Email'),
  Password: z.string({required_error:'Password is required'})
})

const UserSignIn = (props: Props) => {
  
  const router = useRouter()
  const [isLoading, setIsLoading] =  useState<boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
      Password: "",
    },
  })
  
  // 2. Define a submit handler.

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const session = await signInAccount(values.Email,values.Password)
    if(!session){
    return toast({title: 'Sign in Failed. Please Sign Up'})
    }
    router.push('/')
    
  }
  return (
    <div className='w-full  p-12 '>

    <div className=' w-full flex flex-col items-start gap-y-[20px]  '>
 
      <div>
        <h1 className='text-xl font-semibold'>Welcome Back</h1>
        <h1 className='text-sm text-zinc-500'>Log in to your account</h1>
      </div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="Email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm'>Email</FormLabel>
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
              <FormLabel className='text-sm'>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} type='password'/>
              </FormControl>
              <FormMessage />
           
            </FormItem>
          )}
        />
        
        <Link href='/account-recovery' className='flex text-red-400 text-xs justify-end hover: cursor-pointer'>
            Forgot Password?</Link>
        <Button type="submit" className='w-full'>{isLoading ? 
        <div className='flex-center'>  Loading...</div>
          : 'Log In'} </Button>
      </form>
    </Form>
      </div>
      <div className='flex-col  lg:flex text-center text-sm text-neutral-600 p-3 items-center justify-center '>
        <p className='mr-1'>Don't have an account ?</p> 
      <Link href= '/user-entry/sign-up' className='text-primary text-small ml-5'>Create an account</Link>
      </div>
      <div className='py-5 flex justify-center items-center'>
                <Button variant={'outline'}  onClick={loginWithGoogle}>
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
                    Continue with Google</Button>
      </div>
    
      
    </div>
    
  )
}

export default UserSignIn