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
import { registerLandDoc, UpdateJobSiteVisitReport, uploadDoc } from "@/lib/Appwrite/api"
import { toast } from "@/hooks/use-toast"

export function SiteVisitForm({ JobProjectID }: { JobProjectID: string }) {
  const form = useForm({
    defaultValues: {
      landimage: undefined,
    },
  })

  const onSubmit = async () => {
    const fileInput = document.querySelector<HTMLInputElement>("#landimage")

    if (!fileInput?.files?.[0]) {
      toast({ title: "No file selected" })
      return
    }

    const formData = new FormData()
    formData.append("landimage", fileInput.files[0])

    try {
      // 1. Upload to Appwrite
      const uploadResult = await uploadDoc(formData)

      if (!uploadResult?.url) {
        toast({
          title: "Upload Failed",
          
        })
        return
      }

      // 2. Update Site Visit Report with the uploaded file URL
      const updateResult = await UpdateJobSiteVisitReport(JobProjectID, uploadResult.url)

      // Optional: Check success of the update
      if (updateResult?.success || updateResult) {
        toast({
          title: "Upload Successful",
          
        })
      } else {
        toast({
          title: "Update Failed",
          
        })
      }
    } catch (err) {
      console.error("Error during submission:", err)
      toast({
        title: "Unexpected Error",
        
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="landimage"
          render={() => (
            <FormItem>
              <FormLabel>Upload Site Visit Report</FormLabel>
              <FormControl>
                <Input id="landimage" name="landimage" type="file" />
              </FormControl>
              <FormDescription>
                Attach all images or documents gathered in the report.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
