'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AssignPlannerJob, AssignSurveyorJob, AssignLawyerJob } from '@/lib/Appwrite/api'
import { toast } from '@/hooks/use-toast'

type Props = {
  jobId: string
  userEmail: string
  role: 'Planner' | 'Surveyor' | 'Lawyer'
  isAlreadyAssigned: boolean
}

const AcceptJobButton = ({ jobId, userEmail, role, isAlreadyAssigned }: Props) => {
  const [loading, setLoading] = useState(false)

  const handleAccept = async () => {
    setLoading(true)
    try {
      let result

      if (role === 'Planner') {
        result = await AssignPlannerJob(jobId, userEmail)
      } else if (role === 'Surveyor') {
        result = await AssignSurveyorJob(jobId, userEmail)
      } else if (role === 'Lawyer') {
        result = await AssignLawyerJob(jobId, userEmail)
      } else {
        throw new Error('Invalid role')
      }

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
      {loading
        ? 'Accepting...'
        : role === 'Planner'
        ? 'Accept as Planner'
        : role === 'Surveyor'
        ? 'Accept as Surveyor'
        : 'Accept as Lawyer'}
    </Button>
  )
}

export default AcceptJobButton
