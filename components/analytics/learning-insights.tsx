import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, Target, Star, AlertCircle } from "lucide-react"

interface LearningInsightsProps {
  userRoadmaps: any[]
  mentorSessions: any[]
}

export function LearningInsights({ userRoadmaps, mentorSessions }: LearningInsightsProps) {
  const insights = generateInsights(userRoadmaps, mentorSessions)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Personalized Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Personalized Insights
          </CardTitle>
          <CardDescription>AI-powered recommendations for your learning journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.recommendations.map((insight, index) => (
            <div key={index} className="p-3 bg-muted/50 rounded-lg border border-border/50">
              <div className="flex items-start gap-3">
                <insight.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <h4 className="font-medium text-sm">{insight.title}</h4>
                  <p className="text-xs text-muted-foreground">{insight.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {insight.category}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Learning Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Learning Achievements
          </CardTitle>
          <CardDescription>Milestones and accomplishments in your journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.achievements.map((achievement, index) => (
            <div key={index} className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-start gap-3">
                <achievement.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <h4 className="font-medium text-sm">{achievement.title}</h4>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  <Badge variant="default" className="text-xs">
                    {achievement.date}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
          {insights.achievements.length === 0 && (
            <p className="text-muted-foreground text-center py-4">Keep learning to unlock achievements!</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function generateInsights(userRoadmaps: any[], mentorSessions: any[]) {
  const recommendations = []
  const achievements = []

  // Generate recommendations based on user data
  if (userRoadmaps.length === 0) {
    recommendations.push({
      icon: Target,
      title: "Start Your First Roadmap",
      description: "Begin your learning journey by selecting a roadmap that matches your career goals.",
      category: "Getting Started",
    })
  } else {
    const inProgressCount = userRoadmaps.filter((r) => r.status === "in_progress").length
    const completedCount = userRoadmaps.filter((r) => r.status === "completed").length

    if (inProgressCount > 3) {
      recommendations.push({
        icon: AlertCircle,
        title: "Focus Your Learning",
        description: "You have many active roadmaps. Consider focusing on 1-2 to maximize progress.",
        category: "Productivity",
      })
    }

    if (completedCount === 0 && userRoadmaps.length > 0) {
      recommendations.push({
        icon: TrendingUp,
        title: "Push to Completion",
        description: "You're making progress! Focus on completing your first roadmap for a sense of achievement.",
        category: "Motivation",
      })
    }

    if (mentorSessions.length < 3) {
      recommendations.push({
        icon: Lightbulb,
        title: "Ask Your AI Mentor",
        description: "Get personalized guidance by chatting with your AI mentor about your learning goals.",
        category: "Support",
      })
    }
  }

  // Generate achievements
  if (userRoadmaps.length >= 1) {
    achievements.push({
      icon: Star,
      title: "First Steps",
      description: "Started your first learning roadmap",
      date: "Recently",
    })
  }

  if (userRoadmaps.filter((r) => r.status === "completed").length >= 1) {
    achievements.push({
      icon: Target,
      title: "Goal Achiever",
      description: "Completed your first roadmap",
      date: "Recently",
    })
  }

  if (mentorSessions.length >= 5) {
    achievements.push({
      icon: Lightbulb,
      title: "Curious Learner",
      description: "Had 5+ conversations with your AI mentor",
      date: "Recently",
    })
  }

  return { recommendations, achievements }
}
