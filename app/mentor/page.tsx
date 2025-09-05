import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MentorChat } from "@/components/mentor/mentor-chat"

export default async function MentorPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const [profileResult, userRoadmapsResult, mentorSessionsResult] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", data.user.id).single(),
    supabase.from("user_roadmaps").select("*").eq("user_id", data.user.id),
    supabase
      .from("mentor_sessions")
      .select("*")
      .eq("user_id", data.user.id)
      .order("created_at", { ascending: false })
      .limit(10),
  ])

  const profile = profileResult.data
  const userRoadmaps = userRoadmapsResult.data || []
  const mentorSessions = mentorSessionsResult.data || []

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={data.user} profile={profile} />
      <MentorChat user={data.user} userRoadmaps={userRoadmaps} mentorSessions={mentorSessions} />
    </div>
  )
}
