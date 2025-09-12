'use client'

import React, { useState } from 'react'
import {z} from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation';
import { createUserAccount } from '@/lib/Appwrite/api';
import { toast } from '@/hooks/use-toast';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { cn } from '@/lib/utils';
import { DistrictData } from '@/constants';
import ImageUpload from './form-items/ImageUpload';
import IDUpload from './form-items/IDUpload';

type Props = {}

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z
  .object({
    Name: z.string({ required_error: "Name Required" }).min(1, "Name is required"),
    Email: z.string({ required_error: "Email required" }).email("Please Enter a Valid Email"),
    Password: z.string({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters long"),
    repeatPassword: z.string({ required_error: "Please confirm your password" }).min(8, "Password must be at least 8 characters long"),
    Phone: z.string({ required_error: "Phone number is required" }).regex(phoneRegex, "Invalid phone number format"),
    Country: z.string({ required_error: "Country is required" }),
    District: z.string({ required_error: "District is required" }),
    officialAddress: z.string({ required_error: "Official address is required" }),
    profession: z.string({ required_error: "Profession is required" }),
    membershipID: z.string({ required_error: "Membership ID is required" }),
    membershipAffiliation: z.string({ required_error: "Membership affiliation is required" }),
    ID_CARD: z.string({ required_error: "Upload required" }),
  })
  .refine((data) => data.Password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"]
  });

export type TSelectOptions = {
    id: string;
    value: string;
};
export type TSelectDistrictOptions = {
    ID: number;
    REGION: string;
    DISTRICT: string
};

const ServiceSignUp = (props: Props) => {
  const [countryInputValue, setCountryInputValue] = useState<string>("")
  const [districtInputValue, setDistrictInputValue] = useState<string>("")
  const [professionInputValue, setProfessionInputValue] = useState<string>("")
  const [membershipInputValue, setMembershipInputValue] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: "",
      Email: "",
      Password: "",
      repeatPassword: "",
      Phone: '',
      Country: "",
      officialAddress: "",
      profession: "",
      membershipID: "",
      membershipAffiliation: "",
      District: "",
      ID_CARD:"",
    },
  })
 

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      console.log(values)
      const responseuser = await createUserAccount(values)
      
      if (!responseuser) { 
        toast({
          title: 'Registration failed',
          description: 'User already exists',
          variant: 'destructive'
        })
        return 
      }
      
      toast({
        variant: 'default',
        title: 'Registration successful',
        description: 'Welcome to Traverse!'
      })
      router.push('/service-provider/sign-in')
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  const countryData: TSelectOptions[] = [
    { id: 'GH', value: 'Ghana' },
    { id: 'NG', value: 'Nigeria' },
    { id: 'KE', value: 'Kenya' }, // Fixed: KY -> KE for Kenya
  ];

  const professionData: TSelectOptions[] = [
    { id: 'SU', value: 'Surveyor' },
    { id: 'AR', value: 'Architect' }, // Fixed: NA -> AR
    { id: 'LA', value: 'Lawyer' },
    { id: 'LB', value: 'Land broker' },
    { id: 'LAD', value: 'Land Administrator' },
    { id: 'CE', value: 'Civil Engineer' },
    { id: 'UP', value: 'Urban Planner' }, // More specific
  ];

  const membershipData: TSelectOptions[] = [
    { id: 'NAL', value: 'National Association of Lawyers' }, // Fixed: NCL -> NAL
    { id: 'CA', value: 'Chartered Architects' },
    { id: 'GIS', value: 'Ghana Institute of Surveyors' }, // Fixed: GS -> GIS
    { id: 'GIE', value: 'Ghana Institute of Engineers' }, // Fixed: GE -> GIE
    { id: 'NA', value: 'Not Applicable' }, // Fixed: None -> Not
  ];
  const District: TSelectDistrictOptions[] = DistrictData

  return (
    <div className='min-h-screen  p-4 md:p-8'>
      <div className='max-w-4xl'>
        {/* Header Section */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-primary mb-2'>Welcome to Traverse</h1>
          <p className='text-slate-600'>Create your professional account to get started</p>
        </div>

        {/* Form Card */}
        <div className='bg-white rounded-xl shadow-sm border p-6 md:p-8 max-h-screen'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Personal Information Section */}
              <div className='space-y-4'>        
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name="Name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
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
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+233 XX XXX XXXX" {...field} />
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
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name="Password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Minimum 8 characters" {...field} type='password'/>
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
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Repeat your password" {...field} type='password'/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Location Information */}
              <div className='space-y-4'>
       
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
                                  ? countryData.find((country) => country.value === field.value)?.value
                                  : "Select country"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search country..."
                                value={countryInputValue}
                                onValueChange={setCountryInputValue}
                              />
                              <CommandList>
                                <CommandGroup>
                                  {countryData.map((country) => (
                                    <CommandItem
                                      value={country.value}
                                      key={country.id}
                                      onSelect={() => {
                                        form.setValue("Country", country.value)
                                        setCountryInputValue("")
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          country.value === field.value ? "opacity-100" : "opacity-0"
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
                    name="District"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>District</FormLabel>
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
                                  ? District.find((place) => place.DISTRICT === field.value)?.DISTRICT
                                  : "Select District"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search District..."
                                value={districtInputValue}
                                onValueChange={setDistrictInputValue}
                              />
                              <CommandList>
                                <CommandGroup>
                                  {District.map((place) => (
                                    <CommandItem
                                      value={place.DISTRICT}
                                      key={place.ID}
                                      onSelect={() => {
                                        form.setValue("District", place.DISTRICT)
                                        setCountryInputValue("")
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          place.DISTRICT === field.value ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      {place.DISTRICT}
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
                </div>

                </div>



                
                <FormField
                  control={form.control}
                  name="officialAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Official Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your business/official address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              

              {/* Professional Information */}
              <div className='space-y-4'>
           
                
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
                                ? professionData.find((profession) => profession.value === field.value)?.value
                                : "Select profession"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search profession..."
                              value={professionInputValue}
                              onValueChange={setProfessionInputValue}
                            />
                            <CommandList>
                              <CommandGroup>
                                {professionData.map((profession) => (
                                  <CommandItem
                                    value={profession.value}
                                    key={profession.id}
                                    onSelect={() => {
                                      form.setValue("profession", profession.value)
                                      setProfessionInputValue("")
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        profession.value === field.value ? "opacity-100" : "opacity-0"
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

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>
                  <FormField
                    control={form.control}
                    name="membershipID"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Membership ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Professional ID number" {...field} />
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
                        <FormLabel>Professional Body</FormLabel>
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
                                  ? membershipData.find((membership) => membership.value === field.value)?.value
                                  : "Select affiliation"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search affiliation..."
                                value={membershipInputValue}
                                onValueChange={setMembershipInputValue}
                              />
                              <CommandList>
                                <CommandGroup>
                                  {membershipData.map((membership) => (
                                    <CommandItem
                                      value={membership.value}
                                      key={membership.id}
                                      onSelect={() => {
                                        form.setValue("membershipAffiliation", membership.value)
                                        setMembershipInputValue("")
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          membership.value === field.value ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      {membership.value}
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
                </div>
                <div>
                <FormField
  control={form.control}
  name="ID_CARD"
  render={({ field }) => (
    <FormItem>
      <FormLabel>ID Card Upload</FormLabel>
      <FormControl>
        <IDUpload
          value={field.value}
          onChange={(value) => field.onChange(value)}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

                </div>
              </div>
             
              <Button type="submit" className='w-full h-12 text-lg' disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ServiceSignUp