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

// Form validation schema
const formSchema = z.object({
  message: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function Sitevisit() {
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  })

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle form submission
    console.log(values)
    // Add your form submission logic here
  }

  return (
    <div className="w-[800px] p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-sm  mb-6 text-center">Instruction for site visit(optional)</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
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
                    placeholder="Leave your message...." 
                    {...field} 
                    className="mt-1"
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