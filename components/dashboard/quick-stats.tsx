import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Target, Clock, TrendingUp } from "lucide-react"

interface QuickStatsProps {
  userRoadmaps: any[]
}

export function QuickStats({ userRoadmaps }: QuickStatsProps) {
  const totalRoadmaps = userRoadmaps.length
  const inProgressRoadmaps = userRoadmaps.filter((r) => r.status === "in_progress").length
  const completedRoadmaps = userRoadmaps.filter((r) => r.status === "completed").length

  const averageProgress =
    userRoadmaps.length > 0
      ? userRoadmaps.reduce((acc, r) => acc + (r.progress?.completion_percentage || 0), 0) / userRoadmaps.length
      : 0

  const stats = [
    {
      title: "Total Roadmaps",
      value: totalRoadmaps,
      icon: BookOpen,
      description: "Career paths you're exploring",
    },
    {
      title: "In Progress",
      value: inProgressRoadmaps,
      icon: Target,
      description: "Currently active roadmaps",
    },
    {
      title: "Completed",
      value: completedRoadmaps,
      icon: TrendingUp,
      description: "Successfully finished paths",
    },
    {
      title: "Average Progress",
      value: `${Math.round(averageProgress)}%`,
      icon: Clock,
      description: "Overall completion rate",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-card/50 border-border/50 hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{stat.description}</p>
            {stat.title === "Average Progress" && averageProgress > 0 && (
              <Progress value={averageProgress} className="mt-2 h-2" />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
