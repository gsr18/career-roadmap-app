"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, PieChart } from "lucide-react"

interface ProgressChartsProps {
  userRoadmaps: any[]
}

export function ProgressCharts({ userRoadmaps }: ProgressChartsProps) {
  // Group roadmaps by category
  const categoryProgress = userRoadmaps.reduce(
    (acc, roadmap) => {
      const category = roadmap.category
      if (!acc[category]) {
        acc[category] = { total: 0, progress: 0, count: 0 }
      }
      acc[category].total += 100
      acc[category].progress += roadmap.progress?.completion_percentage || 0
      acc[category].count += 1
      return acc
    },
    {} as Record<string, { total: number; progress: number; count: number }>,
  )

  // Calculate difficulty distribution
  const difficultyStats = userRoadmaps.reduce(
    (acc, roadmap) => {
      const difficulty = roadmap.difficulty_level
      acc[difficulty] = (acc[difficulty] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Calculate status distribution
  const statusStats = userRoadmaps.reduce(
    (acc, roadmap) => {
      const status = roadmap.status
      acc[status] = (acc[status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Category Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Progress by Category
          </CardTitle>
          <CardDescription>Your learning progress across different domains</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(categoryProgress).map(([category, data]) => {
            const avgProgress = data.count > 0 ? data.progress / data.count : 0
            return (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{category}</span>
                    <Badge variant="outline" className="text-xs">
                      {data.count} roadmap{data.count !== 1 ? "s" : ""}
                    </Badge>
                  </div>
                  <span className="text-sm font-medium">{Math.round(avgProgress)}%</span>
                </div>
                <Progress value={avgProgress} className="h-2" />
              </div>
            )
          })}
          {Object.keys(categoryProgress).length === 0 && (
            <p className="text-muted-foreground text-center py-4">No roadmaps to analyze yet</p>
          )}
        </CardContent>
      </Card>

      {/* Learning Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Learning Distribution
          </CardTitle>
          <CardDescription>Breakdown of your learning preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Difficulty Distribution */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Difficulty Levels</h4>
            <div className="space-y-2">
              {Object.entries(difficultyStats).map(([difficulty, count]) => (
                <div key={difficulty} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        difficulty === "beginner"
                          ? "bg-green-500"
                          : difficulty === "intermediate"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    />
                    <span className="text-sm capitalize">{difficulty}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {count}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Status Distribution */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Roadmap Status</h4>
            <div className="space-y-2">
              {Object.entries(statusStats).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        status === "completed"
                          ? "bg-green-500"
                          : status === "in_progress"
                            ? "bg-blue-500"
                            : status === "paused"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                      }`}
                    />
                    <span className="text-sm capitalize">{status.replace("_", " ")}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {count}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
