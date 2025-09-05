import { redirect, notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { RoadmapDetails } from "@/components/roadmaps/roadmap-details"

export default async function RoadmapDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const [profileResult, roadmapResult] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", data.user.id).single(),
    supabase.from("user_roadmaps").select("*").eq("id", id).eq("user_id", data.user.id).single(),
  ])

  const profile = profileResult.data
  const roadmap = roadmapResult.data

  if (!roadmap) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={data.user} profile={profile} />
      <RoadmapDetails roadmap={roadmap} />
    </div>
  )
}
