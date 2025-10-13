"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UpdateJobSiteVisitNote1 } from "@/lib/Appwrite/api"
import { toast } from '@/hooks/use-toast'
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { FileText, MapPin, Send, ExternalLink } from "lucide-react"

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
  JobSiteVistNote: string
  Report: string
  SitePlan: string
}

export function Sitevisit({ JobAssignedID, JobSiteVistNote, Report, SitePlan }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: JobSiteVistNote || "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const updatemessage = await UpdateJobSiteVisitNote1(JobAssignedID, values.message)
    if (updatemessage.success) {
      toast({ title: `Site Visit note Submitted Successfully` })
    } else {
      toast({ title: `${updatemessage.error}` })
    }
  }

  const documents = [
    {
      name: "Site Visit Report",
      link: Report,
      icon: FileText,
      available: !!Report,
      description: "(Surveyor)"
    },
    {
      name: "Site Plan",
      link: SitePlan,
      icon: MapPin,
      available: !!SitePlan,
      description: "(Surveyor)"
    }
  ]

  const availableDocuments = documents.filter(doc => doc.available)

  return (
    <div className="w-3/4 max-w-4xl space-y-2">
      {/* Instructions Card */}
      <Card className=" border-primary">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-blue-900 flex items-center">
            
            Site Visit Instructions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Special Instructions or Notes (Optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide any specific instructions for the site visit team..."
                        className="min-h-[100px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                
                  <span>Submit Instructions</span>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Documents Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Site Visit Documents
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            {availableDocuments.length > 0 
              ? `${availableDocuments.length} document(s) available for review`
              : "Documents will appear here once the site visit is completed"
            }
          </p>
        </CardHeader>
        <CardContent>
          {availableDocuments.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {availableDocuments.map((doc, index) => {
                const IconComponent = doc.icon
                return (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 bg-gradient-to-r from-gray-50 to-white"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                       
                        <div className="flex flex-row space-x-1 min-w-0">
                          <h4 className="font-medium text-gray-900 mb-1">
                            {doc.name}
                          </h4>
                          <p className=" font-bold text-primary text-gray-600 leading-relaxed">
                            {doc.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-center">
                      <Link
                        href={`${doc.link}/view?project=6771516200333a41d2ef&mode=admin`}
                        className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                      >
                        <span>View Document</span>
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Documents Available Yet
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Documents will be uploaded here once the site visit and survey work is completed by our team.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}