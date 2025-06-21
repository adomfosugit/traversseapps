"use client"

import { useForm } from "react-hook-form"
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
import { UpdateJobSiteVisitReport, uploadDoc } from "@/lib/Appwrite/api"
import { toast } from "@/hooks/use-toast"
import { useState } from "react"

type FormValues = {
  landimage: FileList | null;
  siteplan: FileList | null;
}

export function SiteVisitForm({ JobProjectID }: { JobProjectID: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<FormValues>({
    defaultValues: {
      landimage: null,
      siteplan: null,
    },
  })

  const onSubmit = async (data: FormValues) => {
    const { landimage, siteplan } = data

    if (!landimage?.[0] && !siteplan?.[0]) {
      toast({ 
        title: "No files selected",
        description: "Please select at least one file to upload",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      let landImageUrl = null
      let sitePlanUrl = null

      // Upload land image if exists
      if (landimage?.[0]) {
        const result = await uploadDoc(landimage[0])
        landImageUrl = result?.url
      }

      // Upload site plan if exists
      if (siteplan?.[0]) {
        const result = await uploadDoc(siteplan[0])
        sitePlanUrl = result?.url
      }

      // Update report with both URLs
      const updateResult = await UpdateJobSiteVisitReport(
        JobProjectID, 
        landImageUrl!, 
        sitePlanUrl!
      )

      if (updateResult) {
        toast({
          title: "Upload Successful",
          description: "Files were uploaded successfully",
        })
        form.reset()
      } else {
        throw new Error("Update failed")
      }
    } catch (error) {
      console.error("Error during submission:", error)
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your files. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="landimage"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Site Visit Images</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  {...rest}
                  onChange={(e) => onChange(e.target.files)}
                />
              </FormControl>
              <FormDescription>
                Attach all images gathered during the site visit.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="siteplan"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Site Plan</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  {...rest}
                  onChange={(e) => onChange(e.target.files)}
                />
              </FormControl>
              <FormDescription>
                Attach the site plan document.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Uploading..." : "Submit"}
        </Button>
      </form>
    </Form>
  )
}