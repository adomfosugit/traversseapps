'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AssignPlannerJob, AssignSurveyorJob } from '@/lib/Appwrite/api'
import { toast } from '@/hooks/use-toast'

type Props = {
  jobId: string
  userEmail: string
  role: 'Planner' | 'Surveyor'
  isAlreadyAssigned: boolean
}

const AcceptJobButton = ({ jobId, userEmail, role, isAlreadyAssigned }: Props) => {
  const [loading, setLoading] = useState(false)

  const handleAccept = async () => {
    setLoading(true)
    try {
      const result =
        role === 'Planner'
          ? await AssignPlannerJob(jobId, userEmail)
          : await AssignSurveyorJob(jobId, userEmail)

      if (result.success) {
        toast({
          title: 'Success',
          description: 'Job has been assigned to you successfully',
        })
      } else {
        toast({
          title: 'Assignment Failed',
          description: result.error || 'Something went wrong',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (isAlreadyAssigned) return null

  return (
    <Button onClick={handleAccept} disabled={loading}>
      {loading ? 'Accepting...' : role === 'Planner' ? 'Accept as Planner' : 'Accept'}
    </Button>
  )
}

export default AcceptJobButton
