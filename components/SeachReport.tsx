
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

import { UpdateJobLawyerReport1, uploadDoc } from "@/lib/Appwrite/api"
import { toast } from "@/hooks/use-toast"
import { useState } from "react"
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type FormValues = {
  zoningReport: FileList | null;
}

export function LCSearchSubForm({ JobProjectID ,Document}: { JobProjectID: string, Document:string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

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

      const updateResult = await UpdateJobLawyerReport1(JobProjectID, fileUrl)

      if (updateResult) {
        toast({
          title: "Upload Successful",
          description: "Lands Commission search report uploaded successfully",
        })
        form.reset()
        setUploadedFile(null)
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

  const handleFileChange = (files: FileList | null, onChange: (files: FileList | null) => void) => {
    onChange(files)
    if (files && files[0]) {
      setUploadedFile(files[0])
    } else {
      setUploadedFile(null)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent, onChange: (files: FileList | null) => void) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileChange(files, onChange)
    }
  }



  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border">
      <div className="mb-6">
        <h2 className=" font-semibold text-primary mb-2">
          Lands Commission Search Report
        </h2>
     
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="zoningReport"
            render={({ field: { onChange, ...rest } }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-blue-700">
                  Document Upload  
                </FormLabel>
                <FormControl>
                  <div
                    className={cn(
                      "relative border-2 border-dashed rounded-lg transition-colors duration-200",
                      isDragOver
                        ? "border-blue-400 bg-blue-50"
                        : uploadedFile
                        ? "border-green-400 bg-green-50"
                        : "border-gray-300 hover:border-gray-400",
                      "p-6"
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, onChange)}
                  >
                    <input
                      type="file"
                      accept="application/pdf,image/*"
                      onChange={(e) => handleFileChange(e.target.files, onChange)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isSubmitting}
                    />
                    
                    <div className="text-center">
                      {uploadedFile ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-green-800">
                              File selected successfully
                            </p>
                            <div className="mt-2 p-3 bg-white rounded-lg border border-green-200">
                              <div className="flex items-center space-x-3">
                                <FileText className="w-5 h-5 text-green-600" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {uploadedFile.name}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-gray-100 rounded-full">
                            <Upload className="w-6 h-6 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Drop your file here, or{" "}
                              <span className="text-blue-600 underline">browse</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Supports PDF and image files
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormDescription className="text-sm text-gray-600">
                  Upload a PDF document containing the Lands Commission search results.
                  Maximum file size: 10MB.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center space-x-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || !uploadedFile}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Upload Document</span>
                </>
              )}
            </Button>
            
            {uploadedFile && !isSubmitting && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset()
                  setUploadedFile(null)
                }}
                className="px-4 py-3"
              >
                Clear
              </Button>
            )}
          </div>

          {isSubmitting && (
            <div className="flex items-center space-x-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing your document upload...</span>
            </div>
          )}
        </form>
      </Form>
    </div>
  )
}