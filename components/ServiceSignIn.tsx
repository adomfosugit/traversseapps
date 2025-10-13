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
import { Loader2 } from 'lucide-react';

type Props = {}

const formSchema = z.object({
  Email: z.string({required_error:'Email required'}).email('Please Enter a Valid Email'),
  Password: z.string({required_error:'Password is required'})
})

const ServiceSignIn = (props: Props) => {
  
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
      Password: "",
    },
  })
     
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    
    try {
      const session = await signInAccount(values.Email, values.Password)
      
      if (!session.success) {
        toast({
          title: `${session.error}`,
          variant: "destructive"
        })
        return
      }
      
      toast({
        title: "Success",
        description: "Welcome back! Redirecting to dashboard...",
      })
      
      router.push('/dashboard')
      
    } catch (error) {
      console.error("Sign in error:", error)
      toast({
        title: "Sign In Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='w-full p-12 '>
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
                <Input 
                  placeholder="Email" 
                  {...field} 
                  disabled={isLoading}
                  className={isLoading ? "opacity-50" : ""}
                />
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
                <Input 
                  placeholder="Password" 
                  {...field} 
                  type='password'
                  disabled={isLoading}
                  className={isLoading ? "opacity-50" : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                 
        <Link 
          href='/account-recovery' 
          className={`flex text-red-400 text-xs justify-end hover:cursor-pointer ${
            isLoading ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          Forgot Password?
        </Link>
        
        <Button 
          type="submit" 
          className='w-full' 
          disabled={isLoading}
        >
          {isLoading ? (
            <div className='flex items-center justify-center space-x-2'>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Signing In...</span>
            </div>
          ) : (
            'Log In'
          )}
        </Button>
      </form>
    </Form>
      </div>
      <div className={`flex-col lg:flex text-center text-sm text-neutral-600 p-3 items-center justify-center ${
        isLoading ? 'opacity-50' : ''
      }`}>
        <p className='mr-1'>Don't have an account ?</p>
       <Link 
         href='/service-provider/sign-up' 
         className={`text-primary text-small ml-5 ${
           isLoading ? 'pointer-events-none' : ''
         }`}
       >
         Create an account
       </Link>
      </div>
                  
    </div>
  )
}

export default ServiceSignIn