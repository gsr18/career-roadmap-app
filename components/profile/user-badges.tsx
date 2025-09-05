"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Flame, Target, BookOpen, Award } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface UserBadgesProps {
  badges: any[]
  stats: {
    totalRoadmaps: number
    completedRoadmaps: number
    currentStreak: number
    totalBadges: number
  }
}

export function UserBadges({ badges, stats }: UserBadgesProps) {
  const getBadgeIcon = (badgeType: string) => {
    switch (badgeType) {
      case "streak":
        return <Flame className="h-4 w-4" />
      case "completion":
        return <Trophy className="h-4 w-4" />
      case "milestone":
        return <Target className="h-4 w-4" />
      case "subject":
        return <BookOpen className="h-4 w-4" />
      default:
        return <Award className="h-4 w-4" />
    }
  }

  const getBadgeColor = (badgeType: string) => {
    switch (badgeType) {
      case "streak":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "completion":
        return "bg-green-100 text-green-800 border-green-200"
      case "milestone":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "subject":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Progress</CardTitle>
          <CardDescription>Track your learning achievements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{stats.totalRoadmaps}</div>
              <div className="text-xs text-muted-foreground">Total Roadmaps</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.completedRoadmaps}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{stats.currentStreak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{stats.totalBadges}</div>
              <div className="text-xs text-muted-foreground">Badges Earned</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Achievements</CardTitle>
          <CardDescription>Badges you've earned on your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          {badges.length > 0 ? (
            <div className="space-y-3">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className={`p-2 rounded-full ${getBadgeColor(badge.badge_type)}`}>
                    {getBadgeIcon(badge.badge_type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{badge.badge_name}</h4>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Earned {formatDistanceToNow(new Date(badge.earned_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium text-muted-foreground mb-2">No badges yet</h3>
              <p className="text-sm text-muted-foreground">
                Start completing roadmaps and maintaining streaks to earn your first badges!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
