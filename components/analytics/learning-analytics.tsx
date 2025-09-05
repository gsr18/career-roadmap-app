import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Target, TrendingUp, MessageSquare, Award, Zap } from "lucide-react"

interface LearningAnalyticsProps {
  userRoadmaps: any[]
  mentorSessions: any[]
}

export function LearningAnalytics({ userRoadmaps, mentorSessions }: LearningAnalyticsProps) {
  // Calculate analytics
  const totalRoadmaps = userRoadmaps.length
  const inProgressRoadmaps = userRoadmaps.filter((r) => r.status === "in_progress").length
  const completedRoadmaps = userRoadmaps.filter((r) => r.status === "completed").length
  const totalMentorSessions = mentorSessions.length

  const averageProgress =
    userRoadmaps.length > 0
      ? userRoadmaps.reduce((acc, r) => acc + (r.progress?.completion_percentage || 0), 0) / userRoadmaps.length
      : 0

  const totalMilestones = userRoadmaps.reduce((acc, r) => acc + (r.milestones?.length || 0), 0)
  const completedMilestones = userRoadmaps.reduce((acc, r) => acc + (r.progress?.completed_milestones?.length || 0), 0)

  const learningStreak = calculateLearningStreak(userRoadmaps)
  const skillsLearned = getUniqueSkills(userRoadmaps)

  const stats = [
    {
      title: "Active Roadmaps",
      value: inProgressRoadmaps,
      total: totalRoadmaps,
      icon: BookOpen,
      description: "Currently learning",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Completion Rate",
      value: `${Math.round(averageProgress)}%`,
      icon: Target,
      description: "Average progress",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Milestones Achieved",
      value: completedMilestones,
      total: totalMilestones,
      icon: Award,
      description: "Learning milestones",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Learning Streak",
      value: learningStreak,
      icon: Zap,
      description: "Days active",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Mentor Sessions",
      value: totalMentorSessions,
      icon: MessageSquare,
      description: "AI conversations",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Skills Acquired",
      value: skillsLearned.length,
      icon: TrendingUp,
      description: "Unique skills",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                {stat.total && <div className="text-sm text-muted-foreground">/ {stat.total}</div>}
              </div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              {stat.total && (
                <Progress
                  value={((typeof stat.value === "number" ? stat.value : 0) / stat.total) * 100}
                  className="h-2 mt-2"
                />
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function calculateLearningStreak(userRoadmaps: any[]): number {
  // Simple calculation - in a real app, this would track daily activity
  const activeDays = userRoadmaps.filter((r) => r.status === "in_progress").length
  return Math.max(activeDays * 3, 1) // Mock calculation
}

function getUniqueSkills(userRoadmaps: any[]): string[] {
  const allSkills = userRoadmaps.flatMap((r) => r.skills || [])
  return [...new Set(allSkills)]
}
