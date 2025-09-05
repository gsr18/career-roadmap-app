import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { LearningAnalytics } from "@/components/analytics/learning-analytics"
import { ProgressCharts } from "@/components/analytics/progress-charts"
import { LearningInsights } from "@/components/analytics/learning-insights"

export default async function AnalyticsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const [profileResult, userRoadmapsResult, mentorSessionsResult] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", data.user.id).single(),
    supabase.from("user_roadmaps").select("*").eq("user_id", data.user.id),
    supabase.from("mentor_sessions").select("*").eq("user_id", data.user.id),
  ])

  const profile = profileResult.data
  const userRoadmaps = userRoadmapsResult.data || []
  const mentorSessions = mentorSessionsResult.data || []

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={data.user} profile={profile} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Learning Analytics</h1>
            <p className="text-muted-foreground mt-1">Insights into your learning journey and progress patterns</p>
          </div>

          <LearningAnalytics userRoadmaps={userRoadmaps} mentorSessions={mentorSessions} />
          <ProgressCharts userRoadmaps={userRoadmaps} />
          <LearningInsights userRoadmaps={userRoadmaps} mentorSessions={mentorSessions} />
        </div>
      </main>
    </div>
  )
}
