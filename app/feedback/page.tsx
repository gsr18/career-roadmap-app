import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { FeedbackForm } from "@/components/feedback/feedback-form"
import { FeedbackHistory } from "@/components/feedback/feedback-history"

export default async function FeedbackPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const [profileResult, feedbackResult, userRoadmapsResult] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", data.user.id).single(),
    supabase.from("feedback").select("*").eq("user_id", data.user.id).order("created_at", { ascending: false }),
    supabase.from("user_roadmaps").select("id, title").eq("user_id", data.user.id),
  ])

  const profile = profileResult.data
  const feedback = feedbackResult.data || []
  const userRoadmaps = userRoadmapsResult.data || []

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={data.user} profile={profile} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Feedback & Support</h1>
            <p className="text-muted-foreground mt-1">
              Help us improve your learning experience by sharing your thoughts and suggestions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FeedbackForm userRoadmaps={userRoadmaps} />
            <FeedbackHistory feedback={feedback} />
          </div>
        </div>
      </main>
    </div>
  )
}
