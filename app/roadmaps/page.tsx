import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MyRoadmaps } from "@/components/roadmaps/my-roadmaps"
import { CreateRoadmapDialog } from "@/components/roadmaps/create-roadmap-dialog"

export default async function RoadmapsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const [profileResult, userRoadmapsResult, templatesResult] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", data.user.id).single(),
    supabase.from("user_roadmaps").select("*").eq("user_id", data.user.id).order("created_at", { ascending: false }),
    supabase.from("roadmap_templates").select("*").order("title"),
  ])

  const profile = profileResult.data
  const userRoadmaps = userRoadmapsResult.data || []
  const templates = templatesResult.data || []

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={data.user} profile={profile} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Roadmaps</h1>
            <p className="text-muted-foreground mt-1">Track your progress and manage your career journey</p>
          </div>
          <CreateRoadmapDialog templates={templates} />
        </div>

        <MyRoadmaps roadmaps={userRoadmaps} />
      </main>
    </div>
  )
}
