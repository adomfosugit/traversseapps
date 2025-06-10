"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UpdateJobSiteVisitNote1 } from "@/lib/Appwrite/api"
import { toast } from '@/hooks/use-toast';
import Link from "next/link"



// Form validation schema
const formSchema = z.object({
  message: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
})

export type TsafeJobAssigned = {
  Job_Executer: string,
  LandID: string,
  Available: string,
  SiteVisitNote: string,
  SurveyorInCharge: string,
  SiteVisitCompletionStatus: boolean,
  jobAssigned: string,
}

type Props = {
  JobAssignedID: string
  JobSiteVistNote:string
  Report:string
}

export function Sitevisit({ JobAssignedID,JobSiteVistNote,Report }: Props) {
  console.log(JobSiteVistNote)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: JobSiteVistNote || "",  
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    const updatemessage  = await UpdateJobSiteVisitNote1(JobAssignedID,values.message)
    if(updatemessage.success){
      toast({title: `Site Visit note Submitted Successfully`})
    }else{
      toast({title: `${updatemessage.error}`})
    }
  }

  return (
    <div className="w-[800px] p-6 bg-white rounded-lg shadow-md flex flex-col gap-y-5">
       {Report && <Link href={`${Report}/view?project=6771516200333a41d2ef&mode=admin`} className="text-blue-500 hover:underline"> Site Visit Report</Link>}
      <h2 className="text-sm mb-6 text-center">Instruction for site visit (optional)</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700">
                  Message
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Leave your message..." 
                    {...field} 
                    className="mt-1 "
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm mt-1" />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button 
              type="submit"
              className="w-full sm:w-auto px-4 py-2"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>

     
    </div>
  )
}
