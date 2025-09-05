"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Clock,
  Target,
  Play,
  Pause,
  CheckCircle,
  MoreHorizontal,
  Calendar,
  TrendingUp,
  ArrowRight,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

interface MyRoadmapsProps {
  roadmaps: any[]
}

export function MyRoadmaps({ roadmaps }: MyRoadmapsProps) {
  const inProgressRoadmaps = roadmaps.filter((r) => r.status === "in_progress")
  const notStartedRoadmaps = roadmaps.filter((r) => r.status === "not_started")
  const completedRoadmaps = roadmaps.filter((r) => r.status === "completed")
  const pausedRoadmaps = roadmaps.filter((r) => r.status === "paused")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "in_progress":
        return <Play className="h-4 w-4 text-primary" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "paused":
        return <Pause className="h-4 w-4 text-yellow-500" />
      default:
        return <BookOpen className="h-4 w-4 text-muted-foreground" />
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

  const RoadmapCard = ({ roadmap }: { roadmap: any }) => {
    const progress = roadmap.progress?.completion_percentage || 0
    const completedMilestones = roadmap.progress?.completed_milestones?.length || 0
    const totalMilestones = roadmap.milestones?.length || 0

    return (
      <Card className="group hover:shadow-lg transition-all duration-200 bg-card/50 border-border/50 hover:border-primary/20">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                {getStatusIcon(roadmap.status)}
                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {roadmap.title}
                </CardTitle>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={getStatusColor(roadmap.status) as any} className="text-xs">
                  {roadmap.status.replace("_", " ")}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {roadmap.category}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {roadmap.difficulty_level}
                </Badge>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/roadmaps/${roadmap.id}`}>View Details</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Edit Roadmap</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Delete Roadmap</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {roadmap.description && (
            <CardDescription className="text-sm line-clamp-2">{roadmap.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {completedMilestones} of {totalMilestones} milestones completed
              </span>
              {roadmap.estimated_duration && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{roadmap.estimated_duration}</span>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>Started</span>
              </div>
              <p className="text-sm font-medium">
                {roadmap.started_at
                  ? formatDistanceToNow(new Date(roadmap.started_at), { addSuffix: true })
                  : "Not started"}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                <span>Last Updated</span>
              </div>
              <p className="text-sm font-medium">
                {formatDistanceToNow(new Date(roadmap.updated_at), { addSuffix: true })}
              </p>
            </div>
          </div>

          <Button className="w-full" asChild>
            <Link href={`/roadmaps/${roadmap.id}`}>
              {roadmap.status === "not_started" ? "Start Roadmap" : "Continue Learning"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (roadmaps.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No roadmaps yet</h3>
          <p className="text-muted-foreground mb-6">
            Start your career journey by creating your first roadmap from our curated templates.
          </p>
          <Button asChild>
            <Link href="/dashboard">Browse Templates</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Tabs defaultValue="in-progress" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="in-progress" className="flex items-center gap-2">
          <Play className="h-4 w-4" />
          In Progress ({inProgressRoadmaps.length})
        </TabsTrigger>
        <TabsTrigger value="not-started" className="flex items-center gap-2">
          <Target className="h-4 w-4" />
          Not Started ({notStartedRoadmaps.length})
        </TabsTrigger>
        <TabsTrigger value="completed" className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          Completed ({completedRoadmaps.length})
        </TabsTrigger>
        <TabsTrigger value="paused" className="flex items-center gap-2">
          <Pause className="h-4 w-4" />
          Paused ({pausedRoadmaps.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="in-progress" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inProgressRoadmaps.map((roadmap) => (
            <RoadmapCard key={roadmap.id} roadmap={roadmap} />
          ))}
        </div>
        {inProgressRoadmaps.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No roadmaps in progress. Start one to begin your journey!</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="not-started" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notStartedRoadmaps.map((roadmap) => (
            <RoadmapCard key={roadmap.id} roadmap={roadmap} />
          ))}
        </div>
        {notStartedRoadmaps.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">All your roadmaps have been started. Great job!</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="completed" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedRoadmaps.map((roadmap) => (
            <RoadmapCard key={roadmap.id} roadmap={roadmap} />
          ))}
        </div>
        {completedRoadmaps.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No completed roadmaps yet. Keep learning to reach your goals!</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="paused" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pausedRoadmaps.map((roadmap) => (
            <RoadmapCard key={roadmap.id} roadmap={roadmap} />
          ))}
        </div>
        {pausedRoadmaps.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No paused roadmaps. Keep up the momentum!</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
