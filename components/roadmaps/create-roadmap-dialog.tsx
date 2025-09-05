"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Clock, Users } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface CreateRoadmapDialogProps {
  templates: any[]
}

export function CreateRoadmapDialog({ templates }: CreateRoadmapDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [customTitle, setCustomTitle] = useState("")
  const [customDescription, setCustomDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCreateRoadmap = async () => {
    if (!selectedTemplate) return

    setIsLoading(true)
    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error("Not authenticated")

      const roadmapData = {
        user_id: user.id,
        template_id: selectedTemplate.id,
        title: customTitle || selectedTemplate.title,
        description: customDescription || selectedTemplate.description,
        category: selectedTemplate.category,
        difficulty_level: selectedTemplate.difficulty_level,
        estimated_duration: selectedTemplate.estimated_duration,
        skills: selectedTemplate.skills,
        milestones: selectedTemplate.milestones,
        status: "not_started",
      }

      const { data, error } = await supabase.from("user_roadmaps").insert(roadmapData).select().single()

      if (error) throw error

      setOpen(false)
      router.push(`/roadmaps/${data.id}`)
      router.refresh()
    } catch (error) {
      console.error("Error creating roadmap:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Roadmap
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Roadmap</DialogTitle>
          <DialogDescription>Choose a template and customize it for your learning journey</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Template Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Choose a Template</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-60 overflow-y-auto">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedTemplate?.id === template.id
                      ? "border-primary bg-primary/5"
                      : "hover:border-primary/50 hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-medium">{template.title}</CardTitle>
                      {template.is_featured && <Badge variant="secondary">Featured</Badge>}
                    </div>
                    <CardDescription className="text-xs line-clamp-2">{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{template.estimated_duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{template.milestones?.length || 0} milestones</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {template.difficulty_level}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Customization */}
          {selectedTemplate && (
            <div className="space-y-4 border-t pt-6">
              <Label className="text-base font-medium">Customize Your Roadmap</Label>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title (Optional)</Label>
                  <Input
                    id="title"
                    placeholder={selectedTemplate.title}
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder={selectedTemplate.description}
                    value={customDescription}
                    onChange={(e) => setCustomDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              {/* Template Preview */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <h4 className="font-medium text-sm">Template Overview</h4>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {(selectedTemplate.skills || []).slice(0, 5).map((skill: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {(selectedTemplate.skills || []).length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{(selectedTemplate.skills || []).length - 5} more
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {selectedTemplate.milestones?.length || 0} milestones • {selectedTemplate.estimated_duration}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleCreateRoadmap} disabled={isLoading} className="flex-1">
                  {isLoading ? "Creating..." : "Create Roadmap"}
                </Button>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
