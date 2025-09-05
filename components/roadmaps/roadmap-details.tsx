"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  Circle,
  Clock,
  Target,
  Play,
  Pause,
  RotateCcw,
  Calendar,
  BookOpen,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Flame,
} from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface RoadmapDetailsProps {
  roadmap: any
}

export function RoadmapDetails({ roadmap: initialRoadmap }: RoadmapDetailsProps) {
  const [roadmap, setRoadmap] = useState(initialRoadmap)
  const [isUpdating, setIsUpdating] = useState(false)
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set())
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set())
  const router = useRouter()

  const calculateProgress = () => {
    if (!roadmap.template?.structure?.subjects) {
      const completedMilestones = roadmap.progress?.completed_milestones || []
      const totalMilestones = roadmap.milestones?.length || 0
      return {
        completed: completedMilestones.length,
        total: totalMilestones,
        percentage: totalMilestones > 0 ? (completedMilestones.length / totalMilestones) * 100 : 0,
      }
    }

    const progressData = roadmap.progress_data || {}
    let totalSteps = 0
    let completedSteps = 0

    roadmap.template.structure.subjects.forEach((subject: any) => {
      subject.topics.forEach((topic: any) => {
        topic.steps.forEach((step: any) => {
          totalSteps++
          if (progressData[`${subject.id}-${topic.id}-${step.id}`]) {
            completedSteps++
          }
        })
      })
    })

    return {
      completed: completedSteps,
      total: totalSteps,
      percentage: totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0,
    }
  }

  const progress = calculateProgress()

  const toggleStep = async (subjectId: string, topicId: string, stepId: string) => {
    setIsUpdating(true)
    const supabase = createClient()

    try {
      const stepKey = `${subjectId}-${topicId}-${stepId}`
      const currentProgressData = roadmap.progress_data || {}
      const isCompleted = currentProgressData[stepKey]

      const newProgressData = {
        ...currentProgressData,
        [stepKey]: !isCompleted,
      }

      let totalSteps = 0
      let completedSteps = 0
      roadmap.template.structure.subjects.forEach((subject: any) => {
        subject.topics.forEach((topic: any) => {
          topic.steps.forEach((step: any) => {
            totalSteps++
            if (newProgressData[`${subject.id}-${topic.id}-${step.id}`]) {
              completedSteps++
            }
          })
        })
      })

      const newPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0

      await supabase.from("user_activities").insert({
        user_id: roadmap.user_id,
        activity_type: "step_completed",
        metadata: { roadmap_id: roadmap.id, step_key: stepKey },
      })

      const updateData = {
        progress_data: newProgressData,
        status: newPercentage === 100 ? "completed" : roadmap.status === "not_started" ? "in_progress" : roadmap.status,
        updated_at: new Date().toISOString(),
      }

      if (roadmap.status === "not_started") {
        updateData.started_at = new Date().toISOString()
      }

      if (newPercentage === 100) {
        updateData.completed_at = new Date().toISOString()
      }

      const { data, error } = await supabase
        .from("user_roadmaps")
        .update(updateData)
        .eq("id", roadmap.id)
        .select(`
          *,
          template:roadmap_templates(*)
        `)
        .single()

      if (error) throw error

      setRoadmap(data)
      router.refresh()
    } catch (error) {
      console.error("Error updating step:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const getSubjectProgress = (subject: any) => {
    const progressData = roadmap.progress_data || {}
    let totalSteps = 0
    let completedSteps = 0

    subject.topics.forEach((topic: any) => {
      topic.steps.forEach((step: any) => {
        totalSteps++
        if (progressData[`${subject.id}-${topic.id}-${step.id}`]) {
          completedSteps++
        }
      })
    })

    return {
      completed: completedSteps,
      total: totalSteps,
      percentage: totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0,
    }
  }

  const getTopicProgress = (subjectId: string, topic: any) => {
    const progressData = roadmap.progress_data || {}
    let totalSteps = 0
    let completedSteps = 0

    topic.steps.forEach((step: any) => {
      totalSteps++
      if (progressData[`${subjectId}-${topic.id}-${step.id}`]) {
        completedSteps++
      }
    })

    return {
      completed: completedSteps,
      total: totalSteps,
      percentage: totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0,
    }
  }

  const toggleSubject = (subjectId: string) => {
    const newExpanded = new Set(expandedSubjects)
    if (newExpanded.has(subjectId)) {
      newExpanded.delete(subjectId)
    } else {
      newExpanded.add(subjectId)
    }
    setExpandedSubjects(newExpanded)
  }

  const toggleTopic = (topicId: string) => {
    const newExpanded = new Set(expandedTopics)
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId)
    } else {
      newExpanded.add(topicId)
    }
    setExpandedTopics(newExpanded)
  }

  const updateRoadmapStatus = async (newStatus: string) => {
    setIsUpdating(true)
    const supabase = createClient()

    try {
      const updateData: any = {
        status: newStatus,
        updated_at: new Date().toISOString(),
      }

      if (newStatus === "in_progress" && roadmap.status === "not_started") {
        updateData.started_at = new Date().toISOString()
      }

      if (newStatus === "completed") {
        updateData.completed_at = new Date().toISOString()
      }

      const { data, error } = await supabase
        .from("user_roadmaps")
        .update(updateData)
        .eq("id", roadmap.id)
        .select(`
          *,
          template:roadmap_templates(*)
        `)
        .single()

      if (error) throw error

      setRoadmap(data)
      router.refresh()
    } catch (error) {
      console.error("Error updating roadmap:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_progress":
        return "default"
      case "completed":
        return "default"
      case "paused":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/roadmaps">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Roadmaps
          </Link>
        </Button>

        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">{roadmap.title}</h1>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={getStatusColor(roadmap.status) as any}>{roadmap.status.replace("_", " ")}</Badge>
                <Badge variant="outline">{roadmap.category}</Badge>
                <Badge variant="outline">{roadmap.difficulty_level}</Badge>
                {roadmap.current_streak > 0 && (
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    <Flame className="h-3 w-3 mr-1" />
                    {roadmap.current_streak} day streak
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {roadmap.status === "not_started" && (
                <Button onClick={() => updateRoadmapStatus("in_progress")} disabled={isUpdating}>
                  <Play className="h-4 w-4 mr-2" />
                  Start Roadmap
                </Button>
              )}
              {roadmap.status === "in_progress" && (
                <>
                  <Button variant="outline" onClick={() => updateRoadmapStatus("paused")} disabled={isUpdating}>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                  <Button onClick={() => updateRoadmapStatus("completed")} disabled={isUpdating}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Complete
                  </Button>
                </>
              )}
              {roadmap.status === "paused" && (
                <Button onClick={() => updateRoadmapStatus("in_progress")} disabled={isUpdating}>
                  <Play className="h-4 w-4 mr-2" />
                  Resume
                </Button>
              )}
              {roadmap.status === "completed" && (
                <Button variant="outline" onClick={() => updateRoadmapStatus("in_progress")} disabled={isUpdating}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Restart
                </Button>
              )}
            </div>
          </div>

          {roadmap.description && <p className="text-muted-foreground">{roadmap.description}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Progress Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Overall Progress</span>
                  <span className="font-medium">{Math.round(progress.percentage)}%</span>
                </div>
                <Progress value={progress.percentage} className="h-3" />
                <p className="text-xs text-muted-foreground">
                  {progress.completed} of {progress.total} steps completed
                </p>
              </div>
            </CardContent>
          </Card>

          {roadmap.template?.structure?.subjects ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Learning Path
                </CardTitle>
                <CardDescription>Navigate through subjects, topics, and steps</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {roadmap.template.structure.subjects.map((subject: any) => {
                  const subjectProgress = getSubjectProgress(subject)
                  const isExpanded = expandedSubjects.has(subject.id)

                  return (
                    <div key={subject.id} className="border rounded-lg p-4 space-y-3">
                      <Collapsible open={isExpanded} onOpenChange={() => toggleSubject(subject.id)}>
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                              <div className={`w-4 h-4 rounded-full ${subject.color}`}></div>
                              <div className="text-left">
                                <h3 className="font-semibold">{subject.name}</h3>
                                <p className="text-sm text-muted-foreground">{subject.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">{Math.round(subjectProgress.percentage)}%</div>
                              <div className="text-xs text-muted-foreground">
                                {subjectProgress.completed}/{subjectProgress.total} steps
                              </div>
                            </div>
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-4 space-y-3">
                          <Progress value={subjectProgress.percentage} className="h-2" />
                          {subject.topics.map((topic: any) => {
                            const topicProgress = getTopicProgress(subject.id, topic)
                            const topicKey = `${subject.id}-${topic.id}`
                            const isTopicExpanded = expandedTopics.has(topicKey)

                            return (
                              <div key={topic.id} className="ml-6 border-l-2 border-muted pl-4 space-y-2">
                                <Collapsible open={isTopicExpanded} onOpenChange={() => toggleTopic(topicKey)}>
                                  <CollapsibleTrigger className="w-full">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        {isTopicExpanded ? (
                                          <ChevronDown className="h-3 w-3" />
                                        ) : (
                                          <ChevronRight className="h-3 w-3" />
                                        )}
                                        <h4 className="font-medium text-left">{topic.name}</h4>
                                      </div>
                                      <div className="text-right">
                                        <div className="text-sm">{Math.round(topicProgress.percentage)}%</div>
                                        <div className="text-xs text-muted-foreground">
                                          {topicProgress.completed}/{topicProgress.total}
                                        </div>
                                      </div>
                                    </div>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent className="mt-2 space-y-2">
                                    <Progress value={topicProgress.percentage} className="h-1" />
                                    <div className="space-y-2">
                                      {topic.steps.map((step: any) => {
                                        const stepKey = `${subject.id}-${topic.id}-${step.id}`
                                        const isCompleted = roadmap.progress_data?.[stepKey] || false

                                        return (
                                          <div
                                            key={step.id}
                                            className="flex items-center gap-3 p-2 rounded hover:bg-muted/50"
                                          >
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-5 w-5 p-0"
                                              onClick={() => toggleStep(subject.id, topic.id, step.id)}
                                              disabled={isUpdating}
                                            >
                                              {isCompleted ? (
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                              ) : (
                                                <Circle className="h-4 w-4 text-muted-foreground" />
                                              )}
                                            </Button>
                                            <div className="flex-1">
                                              <div className="flex items-center gap-2">
                                                <span
                                                  className={`text-sm ${isCompleted ? "line-through text-muted-foreground" : ""}`}
                                                >
                                                  {step.name}
                                                </span>
                                                {step.estimated_hours && (
                                                  <Badge variant="outline" className="text-xs">
                                                    {step.estimated_hours}h
                                                  </Badge>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      })}
                                    </div>
                                  </CollapsibleContent>
                                </Collapsible>
                              </div>
                            )
                          })}
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Learning Milestones
                </CardTitle>
                <CardDescription>Track your progress through each milestone</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {roadmap.milestones?.map((milestone: any, index: number) => {
                  const completedMilestones = roadmap.progress?.completed_milestones || []
                  const isCompleted = completedMilestones.includes(index)
                  const isCurrent = index === (roadmap.progress?.current_milestone || 0) && !isCompleted

                  return (
                    <div key={index} className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 mt-1" disabled={isUpdating}>
                          {isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                        </Button>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h4
                              className={`font-medium ${
                                isCompleted
                                  ? "text-green-600 line-through"
                                  : isCurrent
                                    ? "text-primary"
                                    : "text-foreground"
                              }`}
                            >
                              {milestone.title}
                            </h4>
                            {isCurrent && <Badge variant="outline">Current</Badge>}
                            {milestone.estimated_weeks && (
                              <Badge variant="secondary" className="text-xs">
                                {milestone.estimated_weeks} weeks
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{milestone.description}</p>
                        </div>
                      </div>
                      {index < roadmap.milestones.length - 1 && <Separator className="ml-6" />}
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Roadmap Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{roadmap.estimated_duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Started:</span>
                  <span className="font-medium">
                    {roadmap.started_at
                      ? formatDistanceToNow(new Date(roadmap.started_at), { addSuffix: true })
                      : "Not started"}
                  </span>
                </div>
                {roadmap.completed_at && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-muted-foreground">Completed:</span>
                    <span className="font-medium">
                      {formatDistanceToNow(new Date(roadmap.completed_at), { addSuffix: true })}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skills You'll Learn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {(roadmap.skills || []).map((skill: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/mentor">Ask AI Mentor</Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/feedback">Give Feedback</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
