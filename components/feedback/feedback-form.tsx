"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Bug, Lightbulb, Send, CheckCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface FeedbackFormProps {
  userRoadmaps: Array<{ id: string; title: string }>
}

export function FeedbackForm({ userRoadmaps }: FeedbackFormProps) {
  const [type, setType] = useState<string>("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [roadmapId, setRoadmapId] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()

  const feedbackTypes = [
    {
      value: "bug_report",
      label: "Bug Report",
      description: "Report a technical issue or error",
      icon: Bug,
      color: "destructive",
    },
    {
      value: "feature_request",
      label: "Feature Request",
      description: "Suggest a new feature or improvement",
      icon: Lightbulb,
      color: "default",
    },
    {
      value: "general",
      label: "General Feedback",
      description: "Share your thoughts or suggestions",
      icon: MessageSquare,
      color: "secondary",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!type || !title || !description) return

    setIsSubmitting(true)
    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error("Not authenticated")

      const { error } = await supabase.from("feedback").insert({
        user_id: user.id,
        roadmap_id: roadmapId || null,
        type,
        title,
        description,
        status: "open",
      })

      if (error) throw error

      setIsSubmitted(true)
      setType("")
      setTitle("")
      setDescription("")
      setRoadmapId("")
      router.refresh()

      // Reset success state after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000)
    } catch (error) {
      console.error("Error submitting feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-3">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
            <h3 className="text-lg font-semibold text-green-800">Thank You!</h3>
            <p className="text-green-600">Your feedback has been submitted successfully.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Submit Feedback
        </CardTitle>
        <CardDescription>Help us improve your learning experience</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Feedback Type Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">What type of feedback do you have?</Label>
            <div className="grid grid-cols-1 gap-3">
              {feedbackTypes.map((feedbackType) => {
                const Icon = feedbackType.icon
                return (
                  <div
                    key={feedbackType.value}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      type === feedbackType.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setType(feedbackType.value)}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm">{feedbackType.label}</h4>
                          <Badge variant={feedbackType.color as any} className="text-xs">
                            {feedbackType.value.replace("_", " ")}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{feedbackType.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Related Roadmap */}
          {userRoadmaps.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="roadmap">Related Roadmap (Optional)</Label>
              <Select value={roadmapId} onValueChange={setRoadmapId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a roadmap if this feedback is related to one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No specific roadmap</SelectItem>
                  {userRoadmaps.map((roadmap) => (
                    <SelectItem key={roadmap.id} value={roadmap.id}>
                      {roadmap.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief summary of your feedback"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide detailed information about your feedback..."
              rows={4}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting || !type || !title || !description}>
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Feedback
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
