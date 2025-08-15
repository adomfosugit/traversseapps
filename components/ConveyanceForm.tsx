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
import { UpdateConveyance, UpdateJobLawyerReport1, uploadDoc } from "@/lib/Appwrite/api"
import { toast } from "@/hooks/use-toast"
import { useState } from "react"

type FormValues = {
  zoningReport: FileList | null;
}

export function ConveyanceForm({ JobProjectID }: { JobProjectID: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    defaultValues: {
      zoningReport: null,
    },
  })

  const onSubmit = async (data: FormValues) => {
    const { zoningReport } = data

    if (!zoningReport?.[0]) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    try {
      const uploadResult = await uploadDoc(zoningReport[0])
      const fileUrl = uploadResult?.url

      if (!fileUrl) throw new Error("Upload failed")

      const updateResult = await UpdateConveyance(JobProjectID, fileUrl)

      if (updateResult) {
        toast({
          title: "Upload Successful",
          description: " Convenyance  Uploaded successfully",
        })
        form.reset()
      } else {
        throw new Error("Failed to update job report")
      }
    } catch (error) {
      console.error("Error during submission:", error)
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your file. Please try again.",
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
          name="zoningReport"
          render={({ field: { onChange, ...rest } }) => (
            <FormItem>
              <FormLabel>Conveyance Form</FormLabel>
              <FormControl>
              <input
        type="file"
    accept="application/pdf,image/*"
         onChange={(e) => onChange(e.target.files)}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
        />
              </FormControl>
              <FormDescription>
                Upload a single PDF 
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
