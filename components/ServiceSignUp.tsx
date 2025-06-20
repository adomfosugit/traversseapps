'use client'

import React, { useState } from 'react'
import {z} from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation';
import { createUserAccount, createserviceProvider, getserviceProviderData } from '@/lib/Appwrite/api';
import { toast } from '@/hooks/use-toast';
import { Check, ChevronsUpDown, Phone } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { cn } from '@/lib/utils';
type Props = {}
const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );
  const formSchema = z
  .object({
    Name: z.string({ required_error: "Name Required" }),
    Email: z
      .string({ required_error: "Email required" })
      .email("Please Enter a Valid Email"),
    Password: z.string({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters long"),
    repeatPassword: z.string({ required_error: "Please confirm your password" }).min(8, "Password must be at least 8 characters long"),
    Phone: z
      .string()
      .regex(phoneRegex, "Invalid Number!"),
    Country: z.string({ required_error: "Country is required" }),
    officialAddress: z.string({ required_error: "Official address is required" }),
    profession: z.string({ required_error: "Profession is required" }),
    membershipID: z.string({ required_error: "Membership ID is required" }),
    membershipAffiliation: z.string({ required_error: "Membership ID is required" }),

  })
  .refine((data) => data.Password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"]
  });

export type TSelectOptions = {
    id: string;
    value: string;
  };

const ServiceSignUp = (props: Props) => {
  const [inputValue, setInputValue] = useState<string>("")
  const [countryinputValue, setcountryInputValue] = useState<string>("")
  const [membershipinputValue, setMembershipInputValue] = useState<string>("")
  const router = useRouter()
  const [isLoading, setIsLoading] =  useState<boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    Name: "",
    Email: "",
    Password: "",
    repeatPassword:"",
    Phone:'',
    Country: "",
    officialAddress: "",
    profession: "",
    membershipID: "",
    membershipAffiliation: "",
    
    
    
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
        const responseuser = await createUserAccount(values)
        if(!responseuser) { toast({title: 'Registration failed User Exists'})
          return 
        }
        {toast({variant:'default',title: 'Registered'})}
        router.push('/service-provider/sign-in')
  }
  
  
  const countryData: TSelectOptions[] = [
    { id: 'GH', value: 'Ghana' },
    { id: 'NG', value: 'Nigeria' },
    { id: 'KY', value: 'Kenya' },
  ];

  const professionData: TSelectOptions[] = [
    { id: 'SU', value: 'Surveyor' },
    { id: 'NA', value: 'Architect' },
    { id: 'LA', value: 'Lawyer' },
    { id: 'LB', value: 'Land broker' },
    { id: 'LAD', value: 'Land Administrator' },
    { id: 'CE', value: 'Civil Engineer' },
    { id: 'UP', value: 'Planner' },
  ];

  const membershipData: TSelectOptions[] = [
    { id: 'NCL', value: 'National Association of Lawyers' },
    { id: 'CA', value: 'Chartered Architects' },
    { id: 'GS', value: 'Ghana Institute of Surveyors' },
    { id: 'GE', value: 'Ghana Institute of Engineers' },
    { id: 'NA', value: 'None Applicable' },
  ];
  return (
    <div className='w-full  p-12 h-[600px] overflow-y-scroll '>

    <div className=' w-full flex flex-col items-start gap-y-[20px]  '>
 
      <div>
        <h1 className='text-xl font-semibold text-primary'>Welcome to Traverse</h1>
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
        <FormField
          control={form.control}
          name="repeatPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} type='password'/>
              </FormControl>
              <FormMessage />
           
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone" {...field} type='text'/>
              </FormControl>
              <FormMessage />
           
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="Country"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Country</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? countryData.find(
                            (country) => country.value === field.value
                          )?.value || field.value
                        : "Select "}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className=" p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search..."
                      value={countryinputValue}
                      onValueChange={(value) => {
                        setInputValue(value)
                        form.setValue("Country", value)
                      }}
                    />
                    <CommandList>
                      <CommandGroup>
                        {countryData.map((country:TSelectOptions) => (
                          <CommandItem
                            value={country.value}
                            key={country.id}
                            onSelect={() => {
                              form.setValue("Country", country.value)
                              setcountryInputValue(country.value)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                country.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {country.value}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="officialAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Official Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} type='text'/>
              </FormControl>
              <FormMessage />
           
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="profession"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Profession</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? professionData.find(
                            (profession) => profession.value === field.value
                          )?.value || field.value
                        : "Select "}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className=" p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search..."
                      value={inputValue}
                      onValueChange={(value) => {
                        setInputValue(value)
                        form.setValue("Country", value)
                      }}
                    />
                    <CommandList>
                      <CommandGroup>
                        {professionData.map((profession:TSelectOptions) => (
                          <CommandItem
                            value={profession.value}
                            key={profession.id}
                            onSelect={() => {
                              form.setValue("profession", profession.value)
                              setInputValue(profession.value)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                profession.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {profession.value}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="membershipID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Professional Membership Identification Number</FormLabel>
              <FormControl>
                <Input placeholder="Profession" {...field} type='text'/>
              </FormControl>
              <FormMessage />
           
            </FormItem>
          )}
        />
                 <FormField
          control={form.control}
          name="membershipAffiliation"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Membership Affiliation</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? membershipData.find(
                            (profession) => profession.value === field.value
                          )?.value || field.value
                        : "Select "}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className=" p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search..."
                      value={membershipinputValue}
                      onValueChange={(value) => {
                        setMembershipInputValue(value)
                        form.setValue("membershipAffiliation", value)
                      }}
                    />
                    <CommandList>
                      <CommandGroup>
                        {membershipData.map((profession:TSelectOptions) => (
                          <CommandItem
                            value={profession.value}
                            key={profession.id}
                            onSelect={() => {
                              form.setValue("membershipAffiliation", profession.value)
                              setMembershipInputValue(profession.value)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                profession.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {profession.value}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
             
              <FormMessage />
            </FormItem>
          )}
        />
       
        <Button type="submit" className='w-full'>
        Submit</Button>
      </form>
    </Form>
      </div>

    
    
      
    </div>
    
  )
}

export default ServiceSignUp