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

const formSchema = z.object({
  FirstName: z
    .string({ required_error: "First name is required" })
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .regex(/^[A-Za-z\s]+$/, "First name should only contain letters"),

  LastName: z
    .string({ required_error: "Last name is required" })
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .regex(/^[A-Za-z\s]+$/, "Last name should only contain letters"),

  StreetAddress: z
    .string({ required_error: "Street address is required" })
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address cannot exceed 100 characters"),

  TownCity: z
    .string({ required_error: "Town/City is required" })
    .min(2, "Town/City must be at least 2 characters")
    .max(50, "Town/City cannot exceed 50 characters"),

  PostCode: z
    .string({ required_error: "Postal code is required" })
    .regex(
      /^[A-Za-z0-9\s-]+$/,
      "Postal code should only contain letters, numbers, and hyphens"
    ),

  PhoneNumber: z
    .string({ required_error: "Phone number is required" })
    .regex(
      /^(\+\d{1,3}[- ]?)?\d{10}$/,
      "Please enter a valid phone number (e.g., 1234567890 or +1234567890)"
    ),

  Email: z
    .string({ required_error: "Email is required" })
    .email("Please enter a valid email address"),
});
type Props = {}
const BillingDetailsForm = (props: Props) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FirstName: "",
      LastName: "",
      StreetAddress: "",
      TownCity: "",
      PostCode: "",
      PhoneNumber: "",
      Email: "",
    },
  })
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      // Replace with your actual API call
      // const result = await saveBillingDetails(values);
      // if(!result.success) {
      //   return toast({title: `Error: ${result.error}`})
      // }
      toast({title: "Billing details saved successfully!"})
      router.push('/dashboard')
    } catch (error) {
      toast({title: "An error occurred. Please try again."})
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='w-full py-12'>
      <div className='w-full flex flex-col items-start gap-y-[20px]'>
        <div>
          <h1 className='text-xl font-semibold'>Billing Details</h1>
          <h1 className='text-sm text-zinc-500'>Please enter your billing information</h1>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="FirstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm'>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Firstname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="LastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm'>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Lastname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="Email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm'>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="PhoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm'>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="StreetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm'>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Streetname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="TownCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm'>Town/City</FormLabel>
                    <FormControl>
                      <Input placeholder="Town/City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="PostCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-sm'>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Postal Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className='w-full mt-6' disabled={isLoading}>
              {isLoading ? "Processing..." : "Save Billing Details"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default BillingDetailsForm