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
      siteplan: undefined,
    },
  })

  const onSubmit = async () => {
    const landImageFile = document.querySelector<HTMLInputElement>("#landimage")?.files?.[0]
    const sitePlanFile = document.querySelector<HTMLInputElement>("#siteplan")?.files?.[0]

    if (!landImageFile && !sitePlanFile) {
      toast({ title: "No files selected" })
      return
    }

    try {
      let landImageUrl = null
      let sitePlanUrl = null

      // Upload land image if exists
      if (landImageFile) {
        const landImageFormData = new FormData()
        landImageFormData.append("file", landImageFile)
        const landImageUploadResult = await uploadDoc(landImageFormData)
        landImageUrl = landImageUploadResult?.url
      }

      // Upload site plan if exists
      if (sitePlanFile) {
        const sitePlanFormData = new FormData()
        sitePlanFormData.append("file", sitePlanFile)
        const sitePlanUploadResult = await uploadDoc(sitePlanFormData)
        sitePlanUrl = sitePlanUploadResult?.url
      }

      // Update report with both URLs
      const updateResult = await UpdateJobSiteVisitReport(
        JobProjectID, 
        landImageUrl,
        sitePlanUrl
      )

      if (updateResult?.success || updateResult) {
        toast({
          title: "Upload Successful",
          description: "Both files were uploaded successfully",
        })
      } else {
        toast({
          title: "Update Failed",
          variant: "destructive",
        })
      }
    } catch (err) {
      console.error("Error during submission:", err)
      toast({
        title: "Unexpected Error",
        variant: "destructive",
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
              <FormLabel>Site Visit Images</FormLabel>
              <FormControl>
                <Input id="landimage" name="landimage" type="file" />
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
          render={() => (
            <FormItem>
              <FormLabel>Site Plan</FormLabel>
              <FormControl>
                <Input id="siteplan" name="siteplan" type="file" />
              </FormControl>
              <FormDescription>
                Attach the site plan document.
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